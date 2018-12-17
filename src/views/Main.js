import React from 'react';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import LayoutComponent from './components/LayoutComponent';

const Main = (props) => (
    <main>
        <Switch>
            <Route exact path="/" render={(routeProps) => (
              <LayoutComponent {...routeProps} {...props} />
            )}/>
        </Switch>
    </main>
);

export default Main;
