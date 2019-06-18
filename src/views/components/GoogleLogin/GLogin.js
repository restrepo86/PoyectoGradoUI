import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
//import config from './config.json';

class Glogin extends Component {

    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: ''};
    }

    logout = () => {
        this.setState({isAuthenticated: false, token: '', user: null})
    };

    onFailure = (error) => {
        alert(error);
    };

    googleResponse = (response) => {
        console.log("response token: " + response.tokenId)
        console.log("response token: " + response.accesToken)
        const tokenBlob = new Blob([JSON.stringify({googleAccessToken: response.tokenId}, null, 2)], {type : 'application/json'});
        
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:8080/pensum/usuario/login2', options).then(r => {
            const token = r.headers.get('Access-Token');
            r.json().then(user => {
                if (token) {
                    this.setState({isAuthenticated: true, user, token})
                }
            });
        })
    };

    render() {
    let content = !!this.state.isAuthenticated ?
            (
                <div>
                    <p>Authenticated</p>
                    <div>
                        {this.state.user.email}
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
                    </div>
                </div>
            ) :
            (
                <div>
                    <GoogleLogin
                        clientId={"522970314042-7e8o5tkbepbksj91knjdm7ailjosg3l3.apps.googleusercontent.com"}
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}
                        GoogleScopes={["https://www.googleapis.com/auth/drive.file"]}
                    />
                </div>
            );

        return (
            <div className="App">
                {content}
            </div>
        );
    }
}

export default Glogin;