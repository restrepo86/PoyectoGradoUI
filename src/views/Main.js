import React from 'react';
import LoginForm from './components/LoginForm';
import LayoutComponent from './containers/LayoutComponent';
import RegistrationForm from './components/RegistrationForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


const Main = (props) => (
   
   <main>

            <Router>
               <Switch>
                  <Route exact path="/" component={(routeProps) => (
                     <LoginForm />
                  )} />
                  <Route path="/main" component={(routeProps) => (
                     <LayoutComponent {...routeProps} {...props}/>
                  )} />
                  <Route exact path="/login/register" component={(routeProps) => (
                     <RegistrationForm />
                  )} />
               </Switch>
            </Router>
               
   </main>

);

export default Main;
