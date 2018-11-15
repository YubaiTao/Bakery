import React, { Component } from 'react';
import logo from "../assets/images/logo.svg";
import donut from "../assets/images/donut.png";
import { Icon } from 'antd';

export class Header extends Component {
    render() {
        return (
            <header className="App-header">
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                {this.props.isLoggedIn ?
                    <a className="logout" onClick={this.props.handleLogout}>
                        <Icon type="logout" /> Logout</a> : <div className="place_holder"></div>}
                <div className="logo_wrapper"><img id="spinning" src={donut} className="App-logo" alt="logo"/></div>
                <h1 className="App-title">Bakery</h1>

            </header>
        );
    }
}