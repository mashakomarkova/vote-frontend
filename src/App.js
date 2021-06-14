// import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";
import {withTranslation} from "react-i18next";
import Register from "./register/Register";
import SignIn from "./sign.in/SignIn";
import NotFound from "./NotFound";
import ViewAllElections from "./elections/ViewAllElections";
import CreateElection from "./elections/CreateElection";
import ViewOwnElections from "./elections/ViewOwnElections";
import ViewElection from "./elections/ViewElection";
import ViewOwnElection from "./elections/ViewOwnElection";
import ViewAllUsers from "./admin/ViewAllUsers";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {height: props.height};
    }

    render() {
        return (
            <div>
                <div className="app">
                    <BrowserRouter>
                        <Route path="/" component={Header}/>
                        <Switch>
                            <Route exact path="/home" component={Main}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/" component={Main}/>
                            <Route exact path="/signIn" component={SignIn}/>
                            <Route exact path="/elections" component={ViewAllElections}/>
                            <Route exact path="/elections/create" component={CreateElection}/>
                            <Route exact path="/elections/user" component={ViewOwnElections}/>
                            <Route exact path="/elections/*" component={ViewElection}/>
                            <Route exact path="/private/*" component={ViewOwnElection}/>
                            <Route exact path="/users" component={ViewAllUsers}/>
                            <Route path="*" component={NotFound}/>
                        </Switch>
                        <Route path="/" component={Footer}/>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default withTranslation()(App);

