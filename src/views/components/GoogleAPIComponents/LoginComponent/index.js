import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import LoginUserDTO from '../../../../dto/LoginUserDTO';

@observer
class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.loginStore = this.props.stores.loginStore;
    }

    logout = () => {
        this.loginStore.setIsAuthenticated(false);
    };

    onFailure = (error) => {
        alert(error);
    };

    componentDidMount() {
        if (this.loginStore.validateLoginUserResponse) {
            this.loginStore.setIsAuthenticated(true);
        }
    };

    googleResponse = async (response) => {

        const loginUserDTO = new LoginUserDTO(response.tokenId, response.accessToken);
        await this.loginStore.validateLoginUser(loginUserDTO);
        console.log('this.loginStore.validateLoginUserResponse', this.loginStore.validateLoginUserResponse)

        if (this.loginStore.validateLoginUserResponse) {
            console.log("PUPE TOKEN: " + this.loginStore.validateLoginUserResponse.accesstoken)
            localStorage.setItem( 'Authorization', this.loginStore.validateLoginUserResponse.accesstoken );
            localStorage.setItem( 'GAuthorization', response.accessToken );
            this.loginStore.setIsAuthenticated(true);
            
        } 

    };

    render() {

        if (this.loginStore.isAuthenticated) {
            return <Redirect to='/main/programs' />
        } 

        return (

            <div>
                <GoogleLogin
                    clientId={"522970314042-7e8o5tkbepbksj91knjdm7ailjosg3l3.apps.googleusercontent.com"}
                    scope={"https://www.googleapis.com/auth/drive.file"}
                    buttonText="Login"
                    onSuccess={this.googleResponse}
                    onFailure={this.onFailure}
                />
            </div>

        );
    }
}

export default LoginComponent;