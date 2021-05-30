import {Component} from "react";
import {withTranslation} from "react-i18next";
import ElectionService from "../service/ElectionService";

class ViewAllElections extends Component {

    allElectionsApi = "http://localhost:8080/elections"

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
                                    <th><a href={`/employeesInfo/${election.id}`}>Details</a></th>
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

export default withTranslation()(ViewAllElections);