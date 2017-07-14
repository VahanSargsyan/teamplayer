import React, {PureComponent} from 'react'
import {Nav, NavGroup, NavItem, NavToggle, MenuLink} from 're-bulma'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import styles from '../styles/header.sass'

class Header extends PureComponent {
    constructor(props){
        super(props)
        this.state = {toggleIsOpen: false}
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

    handleToggle = () => {
        this.setState({toggleIsOpen: !this.state.toggleIsOpen})
    }

    render() {
		const whiteFont = {color: 'white'};
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
                <NavToggle onClick={this.handleToggle} isActive={this.state.toggleIsOpen}/>
                {
                    this.state.toggleIsOpen ?
                        <div className="menu">
                            <ul>
                                <NavLink onClick={this.handleToggle} to="/quiz"><li>Quiz</li></NavLink>
                                <NavLink onClick={this.handleToggle} to="/training"><li>Training</li></NavLink>
                                <NavLink onClick={this.handleToggle} to="/profile"><li>Profile</li></NavLink>
                                <MenuLink href="/logout"><li>Logout</li></MenuLink>
                                                               
                            </ul>
                        </div>
                    : null    
                } 
                <NavGroup align="right" isMenu>
                    {this.renderAdminPanel()}
                    {this.props.activeUrl != 'training'
                     && this.props.location.pathname != '/createProfile'
                     && (this.props.location.pathname != '/training'
                     || this.props.trainingFinished)
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
                    {this.props.location.pathname != '/createProfile' && (
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
