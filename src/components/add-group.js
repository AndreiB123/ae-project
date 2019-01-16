import React, { Component } from 'react';

class AddGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: "",
            description: ""
        }
    }

    handleChangeGroup = (event) => {
        this.setState({groupName: event.target.value});
    }

    handleChangeDescription = (event) => {
        this.setState({description: event.target.value});
    }

    handleAddGroup = (e) => {
        const self = this;
        e.preventDefault();
        this.props.db.collection("Grup").add({
            liderId: this.props.userId,
            membriIds: [this.props.userId],
            nume: this.state.groupName,
            descriere: this.state.description,
            files: []
        }).then(function (docRef) {
            self.props.users.filter((user) => user.newId !== self.props.user.uid).forEach((user) => {
                self.props.sendNotification(user.token, "New group was added", "New group was added named " + self.state.groupName, "https://png.icons8.com/search");
            })
        }).catch(function (error) {
            console.error("Error adding document: ", error);
        });

    }

    render() {
        return (
            <div>
                <h3>Add a new group</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" onChange={this.handleChangeGroup} value={this.state.groupName} className="form-control" id="groupName" aria-describedby="name" placeholder="Enter name" />
                        <small id="name" className="form-text text-muted">Choose a descriptive name.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" onChange={this.handleChangeDescription} value={this.state.description} className="form-control" id="description" aria-describedby="description" placeholder="Enter description" />
                        <small id="name" className="form-text text-muted">Insert group description.</small>
                    </div>
                    <button onClick={this.handleAddGroup} type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>

        );
    }
}

export default AddGroup;