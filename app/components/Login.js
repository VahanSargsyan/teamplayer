import React, {PureComponent} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/login.sass';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteFlashMEssage} from '../actions/flashMessage.action';
import {Notification} from 're-bulma';

class Login extends PureComponent {
    
    renderFlashMessage = () => {
        if (this.props.flashMessage != null && this.props.flashMessage.msgType == 'error') {
            return (
                <div className='danger-notification-div'>
                    <Notification color="isDanger" enableCloseButton closeButtonProps={{
                        onClick: () => {
                            this.props.deleteFlashMEssage()
                        }
                    }}>
                        {this.props.flashMessage.text}
                    </Notification>
                </div>
            )
        }
    }
    render() {
        return (
            <div className='login-container'>
                {this.renderFlashMessage()}
                <div className='content'>
                    <h1 className='h1'>
                        The best way to FIT in
                    </h1>
                    <RaisedButton label='Sign in with Google' primary href={`${FETCH_URL}/auth/google`}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {flashMessage: state.flashMessage}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteFlashMEssage
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
