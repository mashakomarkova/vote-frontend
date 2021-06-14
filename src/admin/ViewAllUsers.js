import {Component} from "react";
import {withTranslation} from "react-i18next";

class ViewAllUsers extends Component {

    allUsersApi = window.api+"/users"
    changeUserStatusApi=window.api+"/users/changeStatus"
    grantUserRoleApi=window.api+"/users/grantRole"

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        this.viewAllUsers().then(users => {
            this.setState({users})
        });
    }

    viewAllUsers() {
        return fetch(`${this.allUsersApi}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
    }

    changeStatus(email, onSuccess) {
        fetch(`${this.changeUserStatusApi}/${email}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(() => onSuccess())
    }

    changeUserStatus = (event, email) => {
        event.preventDefault();
        this.changeStatus(email, () => window.location.reload());
    };

    grantRole = (event, email) => {
        event.preventDefault();
        this.grantRoleToUser(email, () => window.location.reload());
    };

    grantRoleToUser(email, onSuccess) {
        fetch(`${this.grantUserRoleApi}/${email}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(() => onSuccess())
    }

    render() {
        const {t} = this.props;

        if (!this.state.users) {
            return null;
        }

        return (
            <div className="container">

                    <table className="uk-table uk-table-striped">
                        <thead>
                        <tr>
                            <th>{t('user email')}</th>
                            <th>{t('user first name')}</th>
                            <th>{t('user last name')}</th>
                            <th>{t('role')}</th>
                            <th>{t('status')}</th>
                            <th>{t('grant role')}</th>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map((user) => {
                                return (
                                    <tr>
                                        <input type="hidden" name="email" value={user.email}/>
                                        <th>{user.email}</th>
                                        <th>{user.firstName}</th>
                                        <th>{user.lastName}</th>
                                        <th>{user.role.name}</th>
                                        <th className={user.status === 'ACTIVE' ? 'uk-text-secondary' : "uk-text-danger"}>{user.status}</th>
                                        <th>
                                            <button className="uk-button uk-button-default" onClick={e => this.changeUserStatus(e, user.email)} type="submit">{user.status === 'ACTIVE' ? 'Block' : "Unlock"}</button>
                                        </th>
                                        <th>
                                            <button className="uk-button uk-button-default" onClick={e => this.grantRole(e, user.email)} type="submit">{t('grant role')}</button>
                                        </th>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
            </div>
        )
    }
}

export default withTranslation()(ViewAllUsers);