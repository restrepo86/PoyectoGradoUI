import React from 'react';
import LoginForm from './components/LoginForm';
import LayoutComponent from './containers/LayoutComponent';
import RegistrationForm from './components/RegistrationForm';
import DriveApi from './components/driveApiComponent/DriveApi';
import GLogin from './components/GoogleLogin/GLogin';
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
                  <Route exact path="/driveAPI" component={(routeProps) => (
                     <DriveApi />
                  )} />
                  <Route exact path="/googleLogin" component={(routeProps) => (
                     <GLogin />
                  )} />
               </Switch>
            </Router>
               
   </main>

);

export default Main;
