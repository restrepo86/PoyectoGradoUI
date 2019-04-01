import React from 'react';
import Main from './views/Main';
import { observer } from 'mobx-react';

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

    render = () => {
     
        return(

            <div style={appStyle.boxContainer}>
                <div style={appStyle.titleContainer}>
                    <h1 style={appStyle.windowTitle}>Gestión Programas UCO</h1>
                </div>
                <div style={{padding: 15}}>
                    <Main {...this.props} />
                </div>
            </div>
      )
    };
    

}

export default App;
