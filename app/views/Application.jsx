import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidAccount: undefined,
            searchResults: []
        }

        this.isValid = this.isValid.bind(this);
        this.autocomplete = this.autocomplete.bind(this);
    }

    isValid() {
        let coaCode = document.getElementById('coaCode').value;
        let accountNumber = document.getElementById('accountNumber').value;
        let self = this;
        axios.get('/api/account/valid?chartOfAccountsCode=' + coaCode + '&accountNumber=' + accountNumber)
            .then(function (response) {
                self.setState({isValidAccount: response.data.totalCount > 0});
            })
            .catch(function (error) {
                console.log(error);
                self.setState({isValidAccount: false});
            });
    }

    autocomplete() {
        let accountName = document.getElementById('searchBox').value;
        let self = this;
        axios.get('/api/account/autocomplete?accountName=' + accountName)
            .then(function (response) {
                self.setState({searchResults: response.data});
            })
            .catch(function (error) {
                console.log(error);
                self.setState({searchResults: []});
            });
    }

    render() {
        let message = '';
        let messageClass = '';
        if (this.state.isValidAccount != undefined) {
            if (this.state.isValidAccount) {
                message = 'Account is Valid';
                messageClass = 'success';
            } else {
                message = 'Account is NOT Valid';
                messageClass = 'failure';
            }
        }
        let accounts = this.state.searchResults.map((accountName, index) => {
            return <li key={accountName + index}>{accountName}</li>;
        });
        return (
            <div>
                <div>
                    <h3>Is Account Active</h3>
                    <div>
                        Chart of Accounts Code: <input type="text" id="coaCode"/>
                    </div>
                    <div>
                        Account Number: <input type="text" id="accountNumber"/>
                    </div>
                    <div>
                        <button onClick={this.isValid}>Check</button>
                    </div>
                    <div className={messageClass}>{message}</div>
                </div>
                <hr/>
                <div>
                    <h3>AutoComplete Account Name</h3>
                    <div>
                        <input type="text" id="searchBox" onKeyUp={this.autocomplete}/>
                        <br/>
                        (start typing account name)
                    </div>
                    <div>
                        <ul>{accounts}</ul>
                    </div>
                </div>
            </div>
        )
    }
}

render(<App/>, document.getElementById('page-content'))
