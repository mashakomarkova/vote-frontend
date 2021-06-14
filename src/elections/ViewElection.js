import {Component} from "react";
import {withTranslation} from "react-i18next";
import Cookies from "js-cookie";

class ViewElection extends Component {

    findElectionApi = "https://votes-backend.herokuapp.com/elections"
    makeChoiceApi = "https://votes-backend.herokuapp.com/choose"
    setTopicApi = "https://votes-backend.herokuapp.com/topics"

    constructor(props) {
        super(props);
        this.state = {
            election: {},
            choiceId: ''
        };
        this.user = JSON.parse(Cookies.get('currentUser'));
    }

    componentDidMount() {
        this.viewElectionById(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))
            .then(election => {
                this.setState({election})
                this.setTopicsToUser(election.topic)
            });

    }

    setTopicsToUser(topic) {
        return fetch(`${this.setTopicApi}/${this.user.email}/${topic}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            }
        }).then((response) => response.json())
    }

    viewElectionById(id) {
        return fetch(`${this.findElectionApi}/${id}/${this.user.id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            }
        }).then((response) => response.json())
    }

    choose(electionId, choiceId, userId, onSuccess) {
        fetch(`${this.makeChoiceApi}/${electionId}/${choiceId}/${userId}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(() => onSuccess())
    }

    handleMakeChoice = (event, electionId, choiceId) => {
        event.preventDefault();
        this.choose(electionId, choiceId, this.user.id, () => window.location.reload());
    };

    handleChoice = (event, choiceId) => {
        event.preventDefault()
        this.setState({
            choiceId:choiceId,
            election: this.state.election
        })
    }

    render() {
        // if (!this.state.employeeWorkflowBean) {
        //     return null;
        // }
        if (!this.state.election.choices) {
            return null;
        }
        const {t} = this.props;
        if (this.state.election.hasUserParticipated) {
            return (
                <section className="confirmation_part section_padding">
                        <div className="container">
                            <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-align-center">

                                <article className="uk-comment">
                                    <header className="uk-comment-header">
                                        <div className="uk-grid-medium uk-flex-middle">
                                            <div className="uk-width-auto">

                                            </div>
                                            <div className="uk-width-expand">
                                                <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                                    <li>{this.state.election.dateOfRegister}</li>
                                                    <li>{this.state.election.status}</li>
                                                    <li>{this.state.election.city}</li>
                                                    <li>{this.state.election.country}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </header>
                                    <div className="uk-comment-body">
                                        <h3>{this.state.election.questionText}</h3>
                                    </div>
                                </article>
                            </div>

                            <table className="uk-table uk-table-striped">
                                <thead>
                                <tr>
                                    <th>{t('choice text')}</th>
                                    <th>{t('choice rate')}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.election.choices.map((choice) => {
                                        return (
                                            <tr>
                                                <th>{choice.name}</th>
                                                <th>{choice.userRates != null ? choice.userRates.length : 0}</th>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                        </div>
                </section>
            )
        }
        else return (
            <section className="confirmation_part section_padding">
                    <div className="container">
                        <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-align-center">

                            <article className="uk-comment">
                                <header className="uk-comment-header">
                                    <div className="uk-grid-medium uk-flex-middle">
                                        <div className="uk-width-auto">

                                        </div>
                                        <div className="uk-width-expand">
                                            <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                                                <li>{this.state.election.dateOfRegister}</li>
                                                <li>{this.state.election.status}</li>
                                                <li>{this.state.election.city}</li>
                                                <li>{this.state.election.country}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </header>
                                <div className="uk-comment-body">
                                    <h3>{this.state.election.questionText}</h3>
                                </div>
                            </article>
                        </div>

                        <table className="uk-table uk-table-striped">
                            <thead>
                            <tr>
                                <th>{t('make choice')}</th>
                                <th>{t('choice text')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.election.choices.map((choice) => {
                                    return (
                                        <tr>
                                            <th><input onChange={e => this.handleChoice(e, choice.id)} type="radio"/></th>
                                            <input type="hidden" name="choiceId" value={choice.id}/>
                                            <th>{choice.name}</th>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={e => this.handleMakeChoice(e, this.state.election.id, this.state.choiceId)} className="uk-button uk-button-primary uk-align-center">{t('make choice')}</button>
            </section>
        )
    }
}

export default withTranslation()(ViewElection);