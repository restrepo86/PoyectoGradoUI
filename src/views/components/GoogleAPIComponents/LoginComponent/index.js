import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import LoginUserDTO from '../../../../dto/LoginUserDTO';
import LogoUco from '../../../../image/universidadcatolicadeorienteuco.jpg'
import PickerConfig from '../../../../credentials.json';
import './style.css';

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

            <div style={{ paddingTop: '100px' }}>
                <center>
                    <div>
                        <img src={LogoUco}  alt="LogoUco" width="400" height="200" />
                    </div>
                    <div>
                    <GoogleLogin
                        clientId={PickerConfig.clientId}
                        scope={PickerConfig.googlePicker.scope}
                        buttonText="Ingresar"
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}
                        className="signInButton"
                    />
                    </div>
                </center>
            </div>

        );
    }
}

export default LoginComponent;