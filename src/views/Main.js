import React from 'react';
import { observer } from 'mobx-react';
import LayoutComponent from './containers/LayoutComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginComponent from './components/GoogleAPIComponents/LoginComponent';
import '../styles/variables.less';

@observer
class Main extends React.Component {
   
   render () {
      const { props } = this;
      return(
   
      <main>
   
               <Router>
                  <Switch>
                     <Route exact path="/" component={(routeProps) => (
                        <LoginComponent {...routeProps} {...props} />
                     )} />
                     <Route path="/main" component={(routeProps) => (
                        <LayoutComponent {...routeProps} {...props}/>
                     )} />
                  </Switch>
               </Router>
                  
      </main>);
   }
}

export default Main;
