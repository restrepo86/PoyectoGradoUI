import React from 'react';
import LoginForm from './components/LoginForm';
import LayoutComponent from './containers/LayoutComponent';
import RegistrationForm from './components/RegistrationForm';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';


const Main = (props) => (
   
   <main>

            <Switch>
               <Route exact path="/" render={(routeProps) => (
                  <LoginForm />
               )} />
               <Route path="/main" render={(routeProps) => (
                  <LayoutComponent {...routeProps} {...props}/>
               )} />
            </Switch>
            <Switch>
               <Route exact path="/login/register" render={(routeProps) => (
                  <RegistrationForm />
               )} />
            </Switch>
   
   </main>

);

export default Main;
