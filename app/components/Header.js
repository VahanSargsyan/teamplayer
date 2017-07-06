import React, {PureComponent} from 'react'
import {Nav, NavGroup, NavItem, NavToggle, MenuLink} from 're-bulma'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

class Header extends PureComponent {
    renderProfileNavItem = () => {
        if (this.props.location.pathname != '/createProfile') {
            return (
                <NavItem>
                    <NavLink to="/profile">Profile</NavLink>
                </NavItem>
            )
        }
    }
    render() {
        return (
            <Nav>
                <NavGroup align="left">
                    <NavItem>
                        <NavLink to={`/${this.props.activeUrl}`}>TeamPlayer</NavLink>
                    </NavItem>
                </NavGroup>
                <NavToggle/>
                <NavGroup align="right" isMenu>
                    {this.renderProfileNavItem()}
                    <NavItem>
                        <MenuLink href="/logout">Logout</MenuLink>
                    </NavItem>
                </NavGroup>
            </Nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeUrl: state.auth.activeUrl
    }
}

export default withRouter(connect(mapStateToProps)(Header))
