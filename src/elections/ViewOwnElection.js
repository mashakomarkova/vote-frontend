import {Component} from "react";
import {withTranslation} from "react-i18next";
import Cookies from "js-cookie";

class ViewOwnElection extends Component {

    findElectionApi = window.api+"/private"
    deactivateElectionApi = window.api+"deactivate"

    constructor(props) {
        super(props);
        this.state = {
            election: {},
        };
        this.currentUser = JSON.parse(Cookies.get('currentUser'));
    }

    componentDidMount() {
        this.viewElectionById(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))
            .then(election => {
                this.setState({election})
            });
    }


    viewElectionById(id) {
        return fetch(`${this.findElectionApi}/${id}/${this.currentUser.id}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            }
        }).then((response) => response.json())
    }

    deactivateElection = (event, electionId) => {
        event.preventDefault()
        this.deactivate(electionId, () => window.location.reload())
    }

    deactivate(id, onSuccess) {
        return fetch(`${this.deactivateElectionApi}/${id}`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            }
        }).then((response) => onSuccess())
    }

    render() {
        // if (!this.state.employeeWorkflowBean) {
        //     return null;
        // }
        if (!this.state.election.choices) {
            return null;
        }
        const {t} = this.props;
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
                                            <li className={this.state.election.status ==='ACTIVE' ? 'uk-text-success' : 'uk-text-danger'}>
                                                {this.state.election.status}</li>
                                            <li>{this.state.election.city}</li>
                                            <li>{this.state.election.country}</li>
                                        </ul>
                                    </div>
                                </div>
                            </header>
                            <div className="uk-comment-body">
                                <textarea className="uk-textarea">{this.state.election.questionText}</textarea>
                            </div>
                        </article>
                    </div>
                    <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-align-center">

                        <article className="uk-comment">
                            <label className="uk-label">{t('Link to copy')}</label>
                            <div className="uk-comment-body">
                                <input className="uk-input" value={window.location.href} />
                            </div>
                        </article>
                    </div>
                    <table className="uk-table uk-table-striped">
                        <thead>
                        <tr>
                            <th>{t('choice text')}</th>
                            <th>{t('results')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.election.choices.map((choice) => {
                                return (
                                    <tr>
                                        <input type="hidden" name="choiceId" value={choice.id}/>
                                        <th><input className="uk-input" name="choices" value={choice.name}/></th>
                                        <th>{choice.userRates != null ? choice.userRates.length : 0}</th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <button className="uk-button uk-button-primary uk-align-center">{t('add choice')}</button>
                    <button className="uk-button uk-button-primary uk-align-center">{t('update')}</button>
                    <button className="uk-button uk-button-default uk-align-center" onClick={e => this.deactivateElection(e, this.state.election.id)}>{t('deactivate')}</button>
                </div>
            </section>
        )
    }
}

export default withTranslation()(ViewOwnElection);