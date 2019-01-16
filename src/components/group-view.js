import React, { Component } from 'react';
import GroupMembersView from './group-members-view';
import AddNews from './add-news';
import NewsView from './news-view';
import FilesView from './files-view';

class GroupView extends Component {
    constructor(props) {
        super(props);
        let nume = "";
        const nonMembers = props.users.filter((user) => !props.group.membriIds.includes(user.newId));
        if (nonMembers.length !== 0)
            nume = nonMembers[0].nume
        this.state = {
            selectedMember: nume,
            nonMembers: nonMembers
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ selectedMember: e.target.value });
    }

    getUserIdFromName = (nume) => {
        return this.props.users.filter((user) => user.nume === nume)[0].newId;
    }

    findUserNameById = (id) => {
        return this.props.users.filter((user) => user.newId === id)[0].nume;
    }

    handleChangeFile = (file) => {
        const group = this.props.group;
        let files = group.files;
        const self = this;
        files.push(file[0].name);
        console.log(file);
        var storageRef = this.props.storage.ref().child(file[0].name);
        storageRef.put(file[0]).then(function (snapshot) {
            console.log('Uploaded a blob or file!');
        }).then(() => {
            this.props.db.collection("Grup")
                .doc(group.id)
                .set({
                    files: files
                }, { merge: true })
                .then(function (docRef) {
                    self.props.users.filter((user) => user.newId !== self.props.user.uid).forEach((user) => {
                        self.props.sendNotification(user.token, "File added", "New file to group " + self.props.group.nume, "https://png.icons8.com/search");
                    })
                }).catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        });
    }

    handleAddNews = (title, description) => {
        const self = this;
        this.props.db.collection("Grup").doc(self.props.group.id).collection("News").add({
            titlu: title,
            descriere: description,
            data: new Date()
        }).then(function (docRef) {
            self.props.users.filter((user) => user.newId !== self.props.user.uid).forEach((user) => {
                self.props.sendNotification(user.token, "News added", "News added to group " + self.props.group.nume, "https://png.icons8.com/search");
            })
        }).catch(function (error) {
            console.error("Error adding document: ", error);
        });
    }

    render() {
        const group = this.props.group;
        const nonMembers = this.props.users.filter((user) => !this.props.group.membriIds.includes(user.newId));
        if (group === undefined || group === null)
            return null;
        return (
            <div className="container">
                <button onClick={this.props.handleBackHome} className="btn btn-xs btn-info align-right mb-3">Back</button>
                <h4>Groupe info: </h4>
                <h5>Name: {group.nume}</h5>
                <h5>Description: {group.descriere}</h5>
                <h5 className="mb-5">Lider: {this.findUserNameById(group.liderId)}</h5>
                {
                    nonMembers.length > 0 &&
                    <div className="row">
                        <select className="custom-select mb-3 col-md-4 col-sm-6" value={this.state.selectedMember} onChange={this.handleChange}>
                            {nonMembers.map(function (member) {
                                return <option key={member.newId}>{member.nume}</option>
                            })}
                        </select>
                        <button onClick={() => this.props.handleMemberAdd(this.getUserIdFromName(this.state.selectedMember))} className="btn btn-xs btn-success ml-3">Add</button>
                    </div>
                }
                {
                    group.membriIds.length > 0 && <GroupMembersView handleDeleteMember={this.props.handleDeleteMember} group={group} users={this.props.users} membersIds={group.membriIds}></GroupMembersView>
                }
                <AddNews handleAddNews={this.handleAddNews} db={this.props.db} group={this.props.selectedGroup} sendNotification={this.props.sendNotification} group={group} users={this.props.users} user={this.props.user}></AddNews>
                <NewsView news={this.props.selectedNews}></NewsView>
                <FilesView files={group.files} storage={this.props.storage}></FilesView>
                <div className="input-group mb-3 mt-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                    </div>
                    <div className="custom-file">
                        <input type="file" onChange={(e) => this.handleChangeFile(e.target.files)} className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                        <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                    </div>
                </div>
            </div>);
    }
}

export default GroupView;