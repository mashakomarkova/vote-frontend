import {Component} from "react";
import {withTranslation} from "react-i18next";
import ElectionService from "../service/ElectionService";

class ControlElections extends Component {

    allElectionsApi = window.api + "/elections"

    constructor(props) {
        super(props);
        this.state = {
            elections: [],
        };
        this.position = new ElectionService(this.allElectionsApi);
    }

    componentDidMount() {
        this.position.viewAllElections().then(elections => {
            this.setState({elections})
        });
    }

    filterByQuestionText = (e) => {
        e.preventDefault();
        const { value } = e.target;
        const elections = this.state.elections.filter(function (election) {
            return election.questionText.includes(value)
        })
        this.setState({elections})

    }
    render() {
        const {t} = this.props;

        if (!this.state.elections) {
            return null;
        }

        return (
            <div className="container">
                <div className="row">
                    <label>Filter by question text</label>
                    <input onChange={this.filterByQuestionText}/>
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
                                    <th><a href={`/elections/${election.id}`}>Set inactivity</a></th>
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

export default withTranslation()(ControlElections);