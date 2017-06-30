import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom'

import Form from './step-2/edit.form'
import Login from './Login'
import Profile from './Profile/Profile'
import Training from './Training/Training'
import ErrorPage from './ErrorPage.js'


class Layout extends PureComponent {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/profile' component={Form}/>
                <Route path='/training' component={Training}/>
                <Route component={ErrorPage}/>
            </Switch>
        );
    }
}

export default connect()(Layout);
