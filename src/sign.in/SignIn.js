import React, {Component} from 'react';
import Cookies from 'js-cookie';
import {withTranslation} from "react-i18next";

class SignIn extends Component {

    signInApi = 'http://localhost:8080/users/logIn';
    getUserInfo = 'http://localhost:8080/users';
    updateUserInfoApi = 'http://localhost:8080/users/update';

    constructor(props) {
        super(props);
        this.isLoggedIn = Cookies.get('currentUser') != null;
    }

    signIn(data, login) {
        return fetch(`${this.signInApi}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((token) => {
                Cookies.set('token', 'Bearer_' + token.token);
                login();
            });
    }

    updateUserInfo(data) {
        return fetch(`${this.updateUserInfoApi}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(() => window.location.reload());
    }

    logUser(email, onSuccess) {
        fetch(`${this.getUserInfo}/${email}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then(data => {
                Cookies.set('currentUser', data);
                onSuccess();
            });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let username = data.get("username");
        let password = data.get("password");
        let user = {username, password};
        this.signIn(user, () => {
            this.logUser(username, () => window.location.reload());
        });
    };

    handleUpdateUserSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let email = data.get("email");
        let password = data.get("password");
        let user = {email, password};
        this.updateUserInfo(user, () => {

        });
    };

    renderPage() {
        const {t} = this.props;

        if (!this.isLoggedIn) {
            return (
                <div className="container uk-margin-large">
                    <div className="uk-align-center">
                        <form method="post" onSubmit={this.handleSubmit}>
                            <fieldset className="uk-fieldset">
                                <div className="uk-margin">
                                    <label>{t('username')}</label>
                                    <input className="uk-input" type="text" name="username"/>
                                </div>
                                <div className="uk-margin">
                                    <label>{t('password')}</label>
                                    <input className="uk-input" type="password" name="password"/>
                                </div>
                                <button type="submit" className="uk-button uk-button-primary">{t('login')}</button>
                            </fieldset>
                        </form>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>

            )
        } else {
            return (
                <section className="login_part section_padding">
                    <div className="container">
                        <form method="post" onSubmit={this.handleUpdateUserSubmit}>
                            <div className="col-md-12 form-group p_star">
                                <label>{t('email')}</label>
                                <input className="form-control" type="text" name="email"/>
                            </div>
                            <div className="col-md-12 form-group p_star">
                                <label>{t('password')}</label>
                                <input className="form-control" type="text" name="password"/>
                            </div>
                            <div className="col-md-12 form-group p_star">
                                <label>{t('repeat password')}</label>
                                <input className="form-control" type="text" name="repeatPassword"/>
                            </div>
                            <button type="submit" className="btn_3">{t('update')}</button>
                        </form>
                    </div>
                </section>
            )
        }
    }

    render() {
        return (
            this.renderPage()
        );
    }
}

export default withTranslation()(SignIn);