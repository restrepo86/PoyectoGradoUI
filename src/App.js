import React from 'react';
import Main from './views/Main';
import { observer } from 'mobx-react';
import { Button } from 'antd';

const appStyle = {
    boxContainer : {
        border: '1px solid green',
        width: '90%',
        margin: 'auto',
    },
    titleContainer: {
        padding: '10px 5px 1px 15px',
        backgroundColor: '#026F35',
    },
    windowTitle: {
        fontSize: 18,
        color: '#FFF'
    }
}

@observer
class App extends React.Component {

    componentDidMount() {
        this.props.stores.loginStore.setLoginOutDisabled(true);
    }

    logOut = (loginStore) => {
        loginStore.setIsAuthenticated(false);
        loginStore.setLoginOutDisabled(true);
        sessionStorage.removeItem( 'Authorization');
        sessionStorage.removeItem( 'GAuthorization');
        window.location.href='/';
    };

    render() {
       
        return(

            <div style={appStyle.boxContainer}>
                <div style={appStyle.titleContainer}>
                
                    <h1 style={appStyle.windowTitle}>
                        Gestión Programas UCO                                                                                      <br/>
                        <Button
                            disabled = { this.props.stores.loginStore.loginOutDisabled }
                            onClick = { () => this.logOut(this.props.stores.loginStore) }
                        >
                            Cerrar Sesión
                        </Button>
                     
                    </h1>
                    
                </div>
                <div style={{padding: 15}}>
                    <Main {...this.props} />
                </div>
            </div>
      )
    };
    

}

export default App;
