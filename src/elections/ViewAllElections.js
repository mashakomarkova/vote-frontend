import {Component} from "react";
import {withTranslation} from "react-i18next";
import ElectionService from "../service/ElectionService";
import Cookies from "js-cookie";

class ViewAllElections extends Component {

    allElectionsApi = window.api+"/elections"
    recommendedElectionsApi = window.api+"/recommended"

    constructor(props) {
        super(props);
        this.state = {
            elections: [],
            recommendedElections:[]
        };
        this.position = new ElectionService(this.allElectionsApi);
        this.currentUser = JSON.parse(Cookies.get('currentUser'));
    }

    componentDidMount() {
        this.position.viewAllElections().then(elections => {
            this.setState({elections: elections})
        });
        this.viewRecommendedElections().then(
            recommendedElections => {
                this.setState({recommendedElections: recommendedElections})
            }
        )
    }

    filterByQuestionText = (e) => {
        e.preventDefault();
        const {value} = e.target;
        const elections = this.state.elections.filter(function (election) {
            return election.questionText.includes(value)
        })
        this.setState({elections})

    }

    viewRecommendedElections() {
        return fetch(`${this.recommendedElectionsApi}/${this.currentUser.email}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
    }

    render() {
        const {t} = this.props;

        if (!this.state.elections) {
            return null;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="uk-search">
                        <label className="uk-label">{t('Filter by question text')}</label>
                        <input className="uk-input uk-form-width-medium" onChange={this.filterByQuestionText}/>
                    </div>
                    <div className="uk-search">
                        <label className="uk-label">{t('Filter by Country')}</label>
                        <input className="uk-input uk-form-width-medium" onChange={this.filterByQuestionText}/>
                    </div>
                    <div className="uk-search">
                        <label className="uk-label">{t('Filter by city')}</label>
                        <input className="uk-input uk-form-width-medium" onChange={this.filterByQuestionText}/>
                    </div>
                </div>
                <table className="uk-table uk-table-striped">
                    <thead>
                    <tr>
                        <th>{t('questionText')}</th>
                        <th>{t('status')}</th>
                        <th>{t('dateOfRegister')}</th>
                        <th>{t('city')}</th>
                        <th>{t('country')}</th>
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
                                    <th><a href={`/elections/${election.id}`}>{t('details')}</a></th>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <br/>
                <br/>
                <br/>
                <br/>
                Recommended
                <table className="uk-table uk-table-striped">
                    <thead>
                    <tr>
                        <th>{t('questionText')}</th>
                        <th>{t('status')}</th>
                        <th>{t('dateOfRegister')}</th>
                        <th>{t('city')}</th>
                        <th>{t('country')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.recommendedElections.map((election) => {
                            return (
                                <tr>
                                    <th>{election.questionText}</th>
                                    <th>{election.status}</th>
                                    <th>{election.dateOfRegister}</th>
                                    <th>{election.city}</th>
                                    <th>{election.country}</th>
                                    <th><a href={`/elections/${election.id}`}>{t('details')}</a></th>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }

}

export default withTranslation()(ViewAllElections);