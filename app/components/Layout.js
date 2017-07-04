import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import { withRouter } from 'react-router';
import Form from './createProfile/edit.form';
import Login from './Login';
import Profile from './Profile/Profile';
import Training from './Training/Training';
import Team from './Team/Team';
import ErrorPage from './ErrorPage.js';


class Layout extends PureComponent {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/profile' component={Form}/>
                <Route path='/training' component={Training}/>
                <Route path='/team' component={Team}/>
                <Route component={ErrorPage}/>
            </Switch>
        );
    }
}

export default Layout;
