import React, { Component } from 'react';

class UserGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    showGroupView = () => {
        this.props.showGroupView();
    }

    findUserNameById = (id) => {
        return this.props.users.filter((user) => user.newId === id)[0].nume;
    }

    render() {
        const { groups, myGroups, users } = this.props;
        const self = this;

        if (groups.length === 0 && myGroups.length === 0)
            return null;

        return (<div>
            {myGroups.length !== 0 &&
                <div>
                    <h3>My groups</h3>
                    <div className="row">
                        {myGroups.map(function (group) {
                            return <div onClick = {() => self.props.handleGroupeClick(group)} key={group.nume + "6"} className="card text-white bg-info mb-3 mr-3 col-md-3 col-sm-6" >
                                <div key={group.nume + "7"} className="card-header">{group.nume}</div>
                                <div key={group.nume + "8"} className="card-body">
                                    <h5 key={group.nume + "9"} className="card-title">Lider: {self.findUserNameById(group.liderId)}</h5>
                                    <p key={group.nume + "10"} className="card-text">{group.descriere}</p>
                                </div>
                            </div>;
                        })}
                    </div>
                </div>}
            {groups.length !== 0 &&
                <div>
                    <h3>Groups</h3>
                    <div className="row">
                        {groups.map(function (group) {

                            return <div onClick = {() => self.props.handleGroupeClick(group)} key={group.nume + "1"} className="card text-white bg-info mb-3 mr-3 col-md-3 col-sm-6">
                                <div key={group.nume + "2"} className="card-header">{group.nume}</div>
                                <div key={group.nume + "3"} className="card-body">
                                    <h5 key={group.nume + "4"} className="card-title">Lider: {self.findUserNameById(group.liderId)}</h5>
                                    <p key={group.nume + "5"} className="card-text">{group.descriere}</p>
                                </div>
                            </div>;
                        })}
                    </div>
                </div>}
        </div>);

    }
}

export default UserGroups;