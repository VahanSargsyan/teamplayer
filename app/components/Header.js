import React, {PureComponent} from 'react'
import {Nav, NavGroup, NavItem, NavToggle, MenuLink} from 're-bulma'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import styles from '../styles/header.sass'

class Header extends PureComponent {

    state = {
        toggleIsOpen: false
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside = (event)=> {
        if(this.refs.menu && !this.refs.menu.contains(event.target) && !this.refs.navToggle.contains(event.target)) {
            this.handleToggle()
        }
    }

    renderAdminPanel = () => {
         if(this.props.admin) {
             return (
                 <NavItem>
                     <NavLink  style={{color: 'white'}} to="/createQuestion">Admin</NavLink>
                 </NavItem>
             )
        }
    }

    handleToggle = (event) => {
        this.setState({toggleIsOpen: !this.state.toggleIsOpen})
    }


    render() {
		const whiteFont = {color: 'white'};
        const renderQuizAndTraining = this.props.activeUrl != 'training'
                     && this.props.location.pathname != '/createProfile'
                     && (this.props.location.pathname != '/training'
                     || this.props.trainingFinished)
        const renderProfile = this.props.location.pathname != '/createProfile'
        return (
            <Nav style={{backgroundColor: '#66d7e6', zIndex: 100}}>
                <NavGroup align="left">
                    <NavItem>
                        <NavLink style={whiteFont} to={`/${this.props.activeUrl}`}>
							<div style={{display: 'flex', alignItems: 'center'}}>
								<img src='./favicon.png' />
								<span style={{margin: 'auto 20px'}}>TeamPlayer</span>
							</div>
						</NavLink>
                    </NavItem>
                </NavGroup>
                <div ref = 'navToggle' >
                    <NavToggle onClick={this.handleToggle} isActive={this.state.toggleIsOpen}/>
                </div>

                {
                    this.state.toggleIsOpen ?
                        <div className="menu" ref='menu'>
                            <ul>
                                {renderQuizAndTraining && (
                                    <div>
                                        <NavLink onClick={this.handleToggle} to="/quiz"><li>Quiz</li></NavLink>
                                        <NavLink onClick={this.handleToggle} to="/training"><li>Training</li></NavLink>
                                    </div>
                                )}
                                {renderProfile && (
                                    <NavLink onClick={this.handleToggle} to="/profile"><li>Profile</li></NavLink>
                                )}

                                <MenuLink href="/logout"><li>Logout</li></MenuLink>

                            </ul>
                        </div>
                    : null
                }
                <NavGroup align="right" isMenu>
                    {this.renderAdminPanel()}
                    {renderQuizAndTraining
                     && (
                        <div style={{
                            display: 'inherit'
                        }}>
                            <NavItem>
                                <NavLink style={whiteFont} to="/quiz">Quiz</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink style={whiteFont} to="/training">Training</NavLink>
                            </NavItem>
                        </div>
                    )}
                    {renderProfile && (
                        <NavItem>
                            <NavLink style={whiteFont} to="/profile">Profile</NavLink>
                        </NavItem>
                    )}
                    <NavItem>
                        <MenuLink style={whiteFont} href="/logout">Logout</MenuLink>
                    </NavItem>
                </NavGroup>
            </Nav>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        activeUrl: state.auth.activeUrl,
        trainingFinished: state.training.finished,
        admin: state.auth.admin
    }
}

export default withRouter(connect(mapStateToProps)(Header))
