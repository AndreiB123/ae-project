import React, { Component } from 'react';
import Home from "./home";
import Menu from "./menu";
import Login from "./login";
import GroupView from "./group-view";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showGroupsView: false,
            showHome: true
        }
    }

    handleLogin = (email, password) => {
        this.props.handleLogin(email, password);
    }

    handleLogout = () => {
        this.props.handleLogout();
    }

    showGroupView = (group) => {
        this.setState({ showGroupsView: true, showHome: false });
    }

    render() {
        const { firebase, db, user, users } = this.props;
        if(users.length === 0)
        return null;
        return (
            <div className="container m-3">
                {user === null ? (
                    <Login handleLogin={this.handleLogin}></Login>
                ) : (
                        <div>
                            <Menu handleLogout={this.handleLogout}></Menu>
                            {
                                this.state.showHome && <Home storage={this.props.storage} askPermission={this.props.askPermission} sendNotification ={this.props.sendNotification} users={users} showGroupView={this.showGroupView} user={user} firebase={firebase} db={db}></Home>
                            }
                            {
                                this.state.showGroupView && <GroupView storage={this.props.storage} sendNotification ={this.props.sendNotification}></GroupView>
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Main;
