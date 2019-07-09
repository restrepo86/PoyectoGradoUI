import React from 'react';
import Main from './views/Main';
import { observer } from 'mobx-react';
import './styles/ucoStyle.css';
//import './styles/variables.less';
//import './App.css';


@observer
class App extends React.Component {

    render() {
       
      return(
        <Main {...this.props} />
      )
    };

}

export default App;
