import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import { withRouter } from 'react-router';
import CreateProfile from './createProfile/CreateProfile';
import Login from './Login';
import Profile from './Profile/Profile';
import Training from './Training/Training';
import Team from './Team/Team';
import ErrorPage from './ErrorPage.js';

import Grid from './Grid/grid';
import Auth from './RouteMiddleware/Auth';
import Guest from './RouteMiddleware/Guest';
import Quizes from './Quiz/Quizes';
import createQuestion from './Admin/createQuestion';
import Admin from './RouteMiddleware/Admin';
import Header from './Header';
import insertCss from 'insert-css';
import css from 're-bulma/build/css';
try {
    if (typeof document !== 'undefined' || document !== null)
        insertCss(css, {prepend: true});
    }
catch (e) {}

class Layout extends PureComponent {

    state = {
        toggleIsOpen: false
    }

    handleToggle = () => {
        this.setState({toggleIsOpen: !this.state.toggleIsOpen})
    }
    renderHeader = () => {

        if (['/createProfile', '/team', '/profile', '/quiz', '/training',  '/createQuestion'].includes(this.props.location.pathname)) {
            return (
                <div>
                    <Header toggleIsOpen={this.state.toggleIsOpen} handleToggle={this.handleToggle}/>
                </div>
            )
        }
    }
    render() {
        return (
            <div className='overlay' onClick={()=>{this.setState({toggleIsOpen: false})}}>
                {this.renderHeader()}
                <Switch>
                    <Route exact path='/' component={Guest(Login)}/>
                    <Route path='/createProfile' component={Auth(CreateProfile)}/>
                    <Route path='/training' component={Auth(Training)}/>
                    <Route path='/profile' component={Auth(Profile)}/>
                    <Route path='/team' component={Auth(Grid)}/>
                    <Route path='/quiz' component={Auth(Quizes)}/>
                    <Route path='/createQuestion' component={createQuestion}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(Layout);
