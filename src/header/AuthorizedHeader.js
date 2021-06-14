import React, {Component} from 'react';
import Cookies from 'js-cookie';
import {withTranslation} from "react-i18next";

class AuthorizedHeader extends Component {

    constructor(props) {
        super(props);
        this.user = JSON.parse(Cookies.get('currentUser'));
    }

    logout() {
        Cookies.remove('currentUser');
        Cookies.remove('token');
        window.location.replace("/signIn");
    }

    render() {
        const {t} = this.props;
        return (
            <>
                <li className="nav-item"><a className="nav-link" href="/elections">{t('all elections')}</a></li>
                <li className="nav-item"><a className="nav-link" href="/elections/create">{t('create election')}</a></li>
                <li className="nav-item"><a className="nav-link" onClick={this.logout}>{t('logout')}</a></li>
                <li className="nav-item"><a className="nav-link" href="/elections/user">{t('own elections')}</a></li>
                <li className="nav-item"><a className="nav-link" href="/signIn">{this.user.email}</a></li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="blog.html" id="navbarDropdown_1"
                       role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {t('language')}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                        <a className="dropdown-item" onClick={() => this.changeLanguage('ua')}>{t('ukrainian')}</a>
                        <a className="dropdown-item" onClick={() => this.changeLanguage('en')}>{t('english')}</a>
                    </div>
                </li>

            </>
        )
    }
}
export default withTranslation()(AuthorizedHeader);