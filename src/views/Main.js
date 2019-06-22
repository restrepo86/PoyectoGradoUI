import React from 'react';
import LoginForm from './components/LoginForm';
import LayoutComponent from './containers/LayoutComponent';
import RegistrationForm from './components/RegistrationForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginComponent from './components/GoogleAPIComponents/LoginComponent';


const Main = (props) => (
   
   <main>

            <Router>
               <Switch>
                  <Route exact path="/" component={(routeProps) => (
                     <LoginComponent {...routeProps} {... props} />
                  )} />
                  <Route path="/main" component={(routeProps) => (
                     <LayoutComponent {...routeProps} {...props}/>
                  )} />
                  <Route exact path="/login/register" component={(routeProps) => (
                     <RegistrationForm {...routeProps} {...props} />
                  )} />
               </Switch>
            </Router>
               
   </main>

);

export default Main;
