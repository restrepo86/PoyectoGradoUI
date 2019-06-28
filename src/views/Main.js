import React from 'react';
import { observer } from 'mobx-react';
import LoginForm from './components/LoginForm';
import LayoutComponent from './containers/LayoutComponent';
import RegistrationForm from './components/RegistrationForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginComponent from './components/GoogleAPIComponents/LoginComponent';

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
                     <Route exact path="/login/register" component={(routeProps) => (
                        <RegistrationForm {...routeProps} {...props} />
                     )} />
                  </Switch>
               </Router>
                  
      </main>);
   }
}

export default Main;
