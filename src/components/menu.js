import React, { Component } from 'react';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="m-b-3">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">StudPlatform</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
                            <a className="nav-item nav-link" onClick={this.props.showGroups} href="#">Groups</a>
                            <a className="nav-item nav-link" href="#">Grades</a>
                            <a className="nav-item nav-link" onClick={this.props.handleLogout}>Logout</a>
                        </div>
                    </div>
                </nav>
            </div>);
    }
}

export default Menu;