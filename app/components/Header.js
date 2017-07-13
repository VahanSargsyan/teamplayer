import React, {PureComponent} from 'react'
import {Nav, NavGroup, NavItem, NavToggle, MenuLink} from 're-bulma'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

class Header extends PureComponent {

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
                <NavToggle/>
                <NavGroup align="right" isMenu>
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
        trainingFinished: state.training.finished
    }
}

export default withRouter(connect(mapStateToProps)(Header))
