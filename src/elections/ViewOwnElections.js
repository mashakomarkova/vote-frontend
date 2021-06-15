import {Component} from "react";
import {withTranslation} from "react-i18next";
import Cookies from "js-cookie";

class ViewOwnElections extends Component {

    ownElectionsApi = window.api+"/elections/own"
    removeElectionsApi = window.api+"/elections/remove"

    constructor(props) {
        super(props);
        this.state = {
            elections: [],
        };
        this.user = JSON.parse(Cookies.get('currentUser'));
    }

    componentDidMount() {
        this.viewOwnElections().then(elections => {
            this.setState({elections})
        });
    }

    viewOwnElections() {
        return fetch(`${this.ownElectionsApi}/${this.user.id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
    }

    removeOwnElection(e, electionId) {
        e.preventDefault()
        return fetch(`${this.removeElectionsApi}/${electionId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => window.location.reload())
    }

    render() {
        const {t} = this.props;

        if (!this.state.elections) {
            return null;
        }

        return (
            <div className="container">
                <table className="uk-table uk-table-striped">
                    <thead>
                    <tr>
                        <th>{t('questionText')}</th>
                        <th>{t('status')}</th>
                        <th>{t('dateOfRegister')}</th>
                        <th>{t('city')}</th>
                        <th>{t('country')}</th>
                        <th>{t('remove')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.elections.map((election) => {
                            return (
                                <tr>
                                    <th>{election.questionText}</th>
                                    <th>{election.status}</th>
                                    <th>{election.dateOfRegister}</th>
                                    <th>{election.city}</th>
                                    <th>{election.country}</th>
                                    <th><a href={`/private/${election.id}`}>{t('details')}</a></th>
                                    <th><a href="#" onClick={(e) =>this.removeOwnElection(e, election.id)}>{t('remove')}</a></th>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        )
    }

}

export default withTranslation()(ViewOwnElections);