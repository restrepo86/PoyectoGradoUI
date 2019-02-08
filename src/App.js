import React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import LayoutComponent from './views/containers/LayoutComponent';
import Main from './views/Main';

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

const App = (props) => (
    <div style={appStyle.boxContainer}>
        <div style={appStyle.titleContainer}>
            <h1 style={appStyle.windowTitle}>Gestión Programas UCO</h1>
        </div>
        <div style={{padding: 15}}>
            <Switch>
                <Route path="/main" render={(routeProps) => (
                    <LayoutComponent />
                )} />
            </Switch>
            <Main {...props} />
        </div>
    </div>
);

export default App;
