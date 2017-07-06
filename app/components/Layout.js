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
import Auth from './RouteMiddleware/Auth';
import Guest from './RouteMiddleware/Guest';
import Quizes from './Quiz/Quizes';
import Header from './Header';
import insertCss from 'insert-css';
import css from 're-bulma/build/css';
try {
    if (typeof document !== 'undefined' || document !== null)
        insertCss(css, {prepend: true});
    }
catch (e) {}

class Layout extends PureComponent {
    renderHeader = () => {
        console.log(this.props)
        if (['/createProfile', '/team', '/profile', '/quiz', '/training'].includes(this.props.location.pathname)) {
            return <Header/>
        }
    }
    render() {
        return (
            <div>
                {this.renderHeader()}
                <Switch>
                    <Route exact path='/' component={Guest(Login)}/>
                    <Route path='/createProfile' component={Auth(Form)}/>
                    <Route path='/training' component={Auth(Training)}/>
                    <Route path='/profile' component={Auth(Profile)}/>
                    <Route path='/team' component={Auth(Team)}/>
                    <Route path='/quiz' component={Auth(Quizes)}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(Layout);
