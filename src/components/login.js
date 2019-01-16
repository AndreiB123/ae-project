import React, { Component } from 'react';

class Login extends Component {
    state = {}

    clearForm = () => {
        this.email.value = '';
        this.password.value = '';
    }

    handleLogin = (event) => {
        event.preventDefault();
        this.props.handleLogin(this.email.value, this.password.value);
        this.clearForm();
    }
    render = () => {
        return (
            <div>
                <h3 className="mb-5">Welcome to StudPlatform. Please login!</h3>
                <form className="w-50">
                    <span htmlFor="e-mail">E-mail</span>
                    <input className="form-control m-2"
                        name="e-mail"
                        type="text"
                        ref={(email) => this.email = email}></input>
                    <span htmlFor="password">Password</span>
                    <input className="form-control m-2"
                        name="password"
                        type="password"
                        ref={(password) => this.password = password}></input>
                    <button className="btn btn-xs btn-success m-2"
                        onClick={this.handleLogin}>
                        Login</button>
                </form>
            </div>
        );
    }
}

export default Login;