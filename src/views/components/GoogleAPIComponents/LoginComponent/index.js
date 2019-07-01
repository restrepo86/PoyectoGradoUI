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
        sessionStorage.removeItem( 'Authorization');
        sessionStorage.removeItem( 'GAuthorization');
    };

    googleResponse = async (response) => {

        const loginUserDTO = new LoginUserDTO(response.tokenId, response.accessToken);
        await this.loginStore.validateLoginUser(loginUserDTO);

        if (this.loginStore.validateLoginUserResponse) {
    
            sessionStorage.setItem( 'Authorization', this.loginStore.validateLoginUserResponse.accesstoken );
            sessionStorage.setItem( 'GAuthorization', response.accessToken );
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