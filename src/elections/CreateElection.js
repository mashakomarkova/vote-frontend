import React, {Component} from "react";
import Cookies from 'js-cookie';
import {withTranslation} from "react-i18next";

class CreateElection extends Component {

    createElectionApi = window.api+"/elections/create"

    constructor(props) {
        super(props);
        this.token = Cookies.get('token');
        this.currentUser = Cookies.get('currentUser');
        this.state = {
            inputList : [{name : ""}]
        }
        this.choiceRef = React.createRef()
    }


    handleInputChange = (e, index) => {
        const { value } = e.target;
        const list = [...this.state.inputList];
        list[index] = value;
        this.setState({
            inputList : list
        })
    };

    handleRemoveClick = index => {
        const list = [...this.state.inputList];
        list.splice(index, 1);
        this.setState({
            inputList : list
        })

    };

    // handle click event of the Add button
    handleAddClick = (e) => {
        const list = [...this.state.inputList];

        list.push({name:this.choiceRef.current.value});
        this.setState( {
                inputList: list
        })
    };

    addElection(data, onSuccess) {
        return fetch(`${this.createElectionApi}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            body: JSON.stringify(data)
        }).then(() => onSuccess());
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let questionText = data.get('questionText');
        let access = data.get('access');
        let city = data.get('city');
        let country = data.get('country');
        let userId = JSON.parse(this.currentUser).id
        let topic = data.get('topic')
        this.state.inputList.shift()
        const choices = [...this.state.inputList];
        this.addElection({questionText, access, city, country, topic, userId, choices},
            () => window.location.reload());
    };

    render() {

        const {t} = this.props;
        return (
            <div className="uk-margin">
                <div className="uk-container">
                    {t('Add Election')}
                    <form method="post" onSubmit={this.handleSubmit}>
                        <div className="uk-margin">
                            <textarea className="uk-textarea" name="questionText" placeholder={t('Enter election question')}/>
                            <select className="uk-select" name="access">
                                <option>public</option>
                                <option>private</option>
                            </select>
                            <input className="uk-input" name="city" placeholder={t('city')}/>
                            <input className="uk-input" name="country" placeholder={t('country')}/>
                            <select className="uk-select">
                                <option>radio</option>
                                <option>multi select</option>
                            </select>
                            <select className="uk-select" name="topic">
                                <option>programming</option>
                                <option>environment</option>
                                <option>fancy</option>
                                <option>travelling</option>
                                <option>reviews</option>
                                <option>science</option>
                                <option>motivation</option>
                                <option>business</option>
                                <option>other</option>
                            </select>
                            <div className="uk-margin" id="create_election" ref={this.createElectionRef}>
                                {t('add choice')}
                                {
                                    this.state.inputList.map((x, i) => {
                                        return(
                                            <div className="input_field uk-form-controls">
                                                <input type="text" name="choices" className="uk-input" ref={this.choiceRef} />
                                                <div>
                                                    {this.state.inputList.length !== 1 && <button
                                                        className="uk-button uk-button-danger"
                                                        onClick={() => this.handleRemoveClick(i)}>{t('remove')}</button>}
                                                    {this.state.inputList.length - 1 === i &&
                                                    <button className="uk-button uk-button-primary"
                                                            onClick={e=>this.handleAddClick(e)}>{t('add')}</button>}
                                                </div>
                                            </div>

                                        )
                                    })
                                }

                            </div>
                        </div>
                        <button type="submit" className="uk-button uk-button-primary">{t('Add Election')}</button>
                    </form>
                    {/*<div style={{ marginTop: 20 }}>{JSON.stringify(this.state.inputList)}</div>*/}
                </div>
            </div>
        )
    }
}
export default withTranslation()(CreateElection);