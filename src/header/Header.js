import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';
import Cookies from 'js-cookie';
import AuthorizedHeader from "./AuthorizedHeader";
import AdminHeader from "./AdminHeader";
import UnAuthorizedHeader from "./UnAuthorizedHeader";

class Header extends Component {

    constructor(props) {
        super(props);
        this.t = props.t;
        this.isLoggedIn = Cookies.get('currentUser') != null;
    }

    renderHeader() {
        if (!this.isLoggedIn) {
            return <UnAuthorizedHeader/>
        } else {
            this.user = JSON.parse(Cookies.get('currentUser'));
            console.log(this.user);
            if (!this.user) {
                return null;
            }
            if (!this.user.role) {
                return null;
            }


            if (this.user.role.name === 'ROLE_ADMIN') {
                    return (
                        <>
                            <AuthorizedHeader/>
                            <AdminHeader/>
                        </>
                    )
                } else {
                    return <AuthorizedHeader/>
                }
        }
    }

    render() {
        const {t} = this.props;
        return (
            <header className="main_menu home_menu">
                <div className="container-fluid">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-11">
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <a className="navbar-brand" href="/"> <img src="img/logo.png" alt="logo"/>
                                </a>
                                <div className="collapse navbar-collapse main-menu-item" id="navbarSupportedContent">
                                    <ul className="navbar-nav">
                                        <li className="nav-item"><a className="nav-link" href="/home">{t("home")}</a>
                                        </li>
                                        {this.renderHeader()}
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default withTranslation()(Header);
