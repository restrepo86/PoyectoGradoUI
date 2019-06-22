import React from 'react';
import Main from './views/Main';
import { observer } from 'mobx-react';
import { Button } from 'antd';
import { Redirect } from 'react-router-dom';

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


    logOut = (loginStore) => {
        console.log("loginStore", loginStore)
        loginStore.setIsAuthenticated(false);
    };

    render() {
        console.log(this.props.stores.loginStore.isAuthenticated)
        if (!this.props.stores.loginStore.isAuthenticated) {
            <Redirect to = '/' />
            console.log(this.props.stores.loginStore.isAuthenticated)
            
        }
     
        return(

            <div style={appStyle.boxContainer}>
                <div style={appStyle.titleContainer}>
                
                    <h1 style={appStyle.windowTitle}>
                        Gestión Programas UCO                                                                                      <br/>
                        <Button
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
