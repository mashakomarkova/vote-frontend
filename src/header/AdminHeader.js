import React, {Component} from 'react';
import Cookies from 'js-cookie';
import {withTranslation} from "react-i18next";

class AdminHeader extends Component {

    constructor(props) {
        super(props);
        this.user = JSON.parse(Cookies.get('currentUser'));
    }

    render() {
        const {t} = this.props;
        return (
            <>
                <li className="nav-item"><a className="nav-link" href="/users">{t('view users')}</a></li>
            </>
        )
    }

}
export default withTranslation()(AdminHeader);