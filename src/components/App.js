import React, { Component } from 'react';
import { Header } from './Header';
import { Main } from "./Main";
import '../styles/App.css';


class App extends Component {
    state = {
        isLoggedIn: false,
        customer_id: "",
    }

    handleLogin = (response) => {
        this.setState({isLoggedIn: true, customer_id: JSON.parse(response)["custid"]});

    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false });
    }

    render() {
        return (
            <div className="App">
                <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
                <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} customer_id={this.state.customer_id}/>
            </div>
        );
    }
}

export default App;
