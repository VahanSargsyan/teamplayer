import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getAuthUser} from '../../actions/auth.action'
import RefreshIndicator from 'material-ui/RefreshIndicator'

export default(Component) => {
    class Guest extends PureComponent {
        state = {
            render: false
        }
        componentWillMount() {
            this.props.getAuthUser(() => {
                this.setState({render: true})
                if (this.props.user) {
                    if (this.props.activeUrl == 'createProfile') {
                        this.props.history.replace('/createProfile')
                    } else if (this.props.activeUrl == 'training' &&  this.props.match.path != '/profile') {
                        this.props.history.replace('/training')
                    } else if (this.props.activeUrl == 'team' &&  this.props.match.path != '/profile') {
                        this.props.history.replace('/team')
                    } else if (this.props.match.path == '/createProfile' || this.props.match.path == '/training') {
                        this.props.history.replace(`/${this.props.activeUrl}`)
                    }
                }
            })
        }
        render() {
            if (!this.props.user && this.state.render) {
                return <Component {...this.props}/>
            } else {
                return (
                    <div className='refresh-indicator'>
                        <RefreshIndicator size={50} left={70} top={0}
                            loadingColor="#FF9800" status="loading"/>
                    </div>
                )
            }
        }
    }
    const mapStateToProps = (state) => {
        return {user: state.auth.user, activeUrl: state.auth.activeUrl}
    }
    const mapDispatchToprops = (dispatch) => {
        return bindActionCreators({
            getAuthUser
        }, dispatch)
    }
    return connect(mapStateToProps, mapDispatchToprops)(Guest)
}
