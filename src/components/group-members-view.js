import React, { Component } from 'react';

class GroupMembersView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    formatNotificationType = (notificationType) => {
        if (notificationType === 'p') {
            return "Push notification";
        } else if (notificationType === 'e+p') {
            return "Push notification + e-mail";
        } else if (notificationType === 'e') {
            return "E-mail";
        } else return "No notifications";
    }

    handleDelete = (id) => {
        this.props.handleDeleteMember(id);
    }

    render() {
        if (this.props.group === undefined || this.props.group === null)
            return null;
        const self = this;
        const membersIds = this.props.group.membriIds;
        const members = this.props.users.filter((user) => membersIds.includes(user.newId));
        return (
            <div>
                <h5>Members:</h5>
                <div className="table-responsive">
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Year</th>
                                <th scope="col">Semester</th>
                                <th scope="col">Notification type</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(function (member) {
                                return <tr key={member.nume + "1"}>
                                    <th key={member.nume + "2"} scope="row">{member.nume}</th>
                                    <td key={member.nume + "3"}>{member["e-mail"]}</td>
                                    <td key={member.nume + "4"}>{member.an}</td>
                                    <td key={member.nume + "5"}>{member.semestru}</td>
                                    <td key={member.nume + "6"}>{self.formatNotificationType(member.tipNotificare)}</td>
                                    <td key={member.nume + "7"}><button onClick={() => self.handleDelete(member.newId)} className="btn btn-xs btn-danger" disabled={member.newId === self.props.group.liderId}>Remove</button></td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default GroupMembersView;