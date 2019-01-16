import React, { Component } from 'react';
import UserGroups from "./user-groups";
import AddGroup from '../components/add-group';
import GroupView from "../components/group-view";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addGroup: true,
            groups: [],
            myGroups: [],
            selectedGroup: null,
            selectedNews: []
        }
    }

    handleGroupeClick = (group) => {
        let localNews = [];
        const self = this;
        // this.props.db.collection("Grup").doc(group.id).collection("News").get().then((querySnapshot) => {
        //     querySnapshot.forEach((doc) => {
        //         localNews.push(doc.data());
        //     });
        //     self.setState({ selectedNews: localNews, selectedGroup: group });
        // });
        this.props.db.collection("Grup").doc(group.id).collection("News")
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type === "added") {
                        localNews.push(change.doc.data());
                    }
                });
                self.setState({ selectedNews: localNews, selectedGroup: group });
            });
    }

    handleBackHome = () => {
        this.setState({ selectedGroup: null });
    }

    handleDeleteMember = (memberId) => {
        const selectedGroup = this.state.selectedGroup;
        const selectedMember = this.props.users.filter((user) => user.newId === memberId)[0];
        const members = selectedGroup.membriIds;
        const self = this;
        var index = members.indexOf(memberId);
        console.log(selectedGroup)
        members.splice(index, 1);
        if (selectedGroup.id !== undefined) {
            this.props.db.collection("Grup")
                .doc(selectedGroup.id)
                .set({
                    membriIds: members
                }, { merge: true })
                .then(function (docRef) {
                    console.log("Enter remove");
                    self.props.sendNotification(selectedMember.token, "Deleted from group", "You we're deleted from group named " + selectedGroup.nume, "https://png.icons8.com/search");
                }).catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }
    }

    handleMemberAdd = (memberId) => {
        const selectedGroup = this.state.selectedGroup;
        const members = selectedGroup.membriIds;
        console.log(memberId);
        const selectedMember = this.props.users.filter((user) => user.newId === memberId)[0];
        const self = this;
        console.log(selectedMember)
        members.push(memberId);
        if (selectedGroup.id !== undefined) {
            this.props.db.collection("Grup")
                .doc(selectedGroup.id)
                .set({
                    membriIds: members
                }, { merge: true })
                .then(function (docRef) {
                    self.props.sendNotification(selectedMember.token, "Added to a new group", "You we're added to a new group named " + selectedGroup.nume, "https://png.icons8.com/search");
                }).catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }
    }

    componentDidMount() {
        //"value", "child_added", "child_removed", "child_changed", or "child_moved".
        const self = this;
        const myGroupsLocal = this.state.myGroups;
        const groupsLocal = this.state.groups;
        const userId = this.props.user.uid;
        this.props.db.collection("Grup")
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type === "added") {
                        let data = change.doc.data();
                        data.id = change.doc.id;
                        console.log(change.doc.data());
                        if (data.liderId === userId) {
                            myGroupsLocal.push(data);
                            console.log("Added my groups local");
                        } else {
                            groupsLocal.push(data);
                            console.log("Added groups local");
                        }
                    }
                    if (change.type === "modified") {
                        console.log("Modified city: ", change.doc.data());
                    }
                    if (change.type === "removed") {
                        console.log("Removed city: ", change.doc.data());
                    }
                });
                self.setState({ myGroups: myGroupsLocal, groups: groupsLocal });
            });

        this.props.askPermission();
    }

    handleChange = (file) => 
    {
        console.log(file);
        var storageRef = this.props.storage.ref().child(file[0].name);
        storageRef.put(file[0]).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
        });
    }

    render() {
        const { groups, myGroups, selectedGroup, selectedNews } = this.state;
        const user = this.props.user;
        return (
            <div className="m-3">
                {
                    selectedGroup == null ?
                        <div>
                            <h2 className="mb-3">Login as {user.email}.</h2>
                            <AddGroup user={this.props.user} sendNotification={this.props.sendNotification} users={this.props.users} db={this.props.db} userId={this.props.user.uid}></AddGroup>
                            <UserGroups handleDeleteMember={this.handleDeleteMember} handleGroupeClick={this.handleGroupeClick} users={this.props.users} showGroupView={this.props.showGroupView} groups={groups} myGroups={myGroups} userId={this.props.user.uid}></UserGroups>
                        </div>
                        :
                        <GroupView storage={this.props.storage} sendNotification={this.props.sendNotification} user={this.props.user} db={this.props.db} selectedNews={selectedNews} handleDeleteMember={this.handleDeleteMember} handleMemberAdd={this.handleMemberAdd} handleBackHome={this.handleBackHome} userId={this.props.user.uid} users={this.props.users} group={selectedGroup}></GroupView>
                }
            </div>
        );
    }
}

export default Home;