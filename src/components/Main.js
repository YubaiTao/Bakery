import React, { Component } from 'react';
import { Login } from './Login';
import { Home } from './Home';
import { Switch, Route, Redirect } from 'react-router-dom';


export class Main extends Component {


    getLogin = () => {
        return this.props.isLoggedIn? <Redirect to="/home"/> :
            <Login handleLogin={this.props.handleLogin}/>;
    }
    getHome = () => {
        console.log(this.props.customer_id);
        console.log(this.props.isLoggedIn);
        return this.props.isLoggedIn? <Home customer_id={this.props.customer_id}/> : <Redirect to="/login" />;
    }
    getRoot = () => {
        return <Redirect to="/login"/>;
    }




    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getRoot}/>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/home" render={this.getHome} />
                    <Route render={this.getRoot}/>
                </Switch>
            </div>
        );
    }
}