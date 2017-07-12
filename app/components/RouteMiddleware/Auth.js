import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getAuthUser} from '../../actions/auth.action'
import {addFlashMessage} from '../../actions/flashMessage.action'
import RefreshIndicator from 'material-ui/RefreshIndicator'

export default(Component) => {

    class Auth extends PureComponent {
        state = {
            render: false
        }
        componentWillMount() {
            this.props.getAuthUser(() => {
                this.setState({render: true})
                if (!this.props.user) {
                    this.props.addFlashMessage('Please login to access this page', 'error')
                    this.props.history.replace('/')
                } else if (this.props.activeUrl === 'createProfile' && this.props.match.path != '/createProfile') {
                    this.props.history.replace('createProfile')
                } else if (this.props.activeUrl === 'training' && this.props.match.path != '/training' && this.props.match.path != '/profile') {
                    this.props.history.replace('training')
                } else if (this.props.activeUrl === 'team'
                    && this.props.match.path != '/team' 
                    && this.props.match.path != '/training'
                    && this.props.match.path != '/quiz'
                    &&  this.props.match.path != '/profile') {
                    this.props.history.replace('team')
                }
            })
        }

        render() {

            if (this.props.user && this.state.render) {
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
            getAuthUser,
            addFlashMessage
        }, dispatch)
    }
    return connect(mapStateToProps, mapDispatchToprops)(Auth)
}
