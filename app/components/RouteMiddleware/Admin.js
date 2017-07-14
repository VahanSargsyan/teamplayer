import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getAuthUser} from '../../actions/auth.action'
import {addFlashMessage} from '../../actions/flashMessage.action'
import RefreshIndicator from 'material-ui/RefreshIndicator'

export default(Component) => {

    class Admin extends PureComponent {

        componentWillMount() {
            if(!this.props.admin) {
                this.props.history.replace('/')
            }
        }

        render() {

            if (this.props.admin) {
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
        return {admin: state.auth.admin}
    }
    return connect(mapStateToProps)(Admin)
}
