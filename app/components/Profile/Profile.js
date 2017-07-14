import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {Notification} from 're-bulma';
import XItem from './XItem';
import Hobbies from './Hobbies';
import Gender from './Gender';
import Image from './Image';
import './profile.sass';
import { deleteFlashMEssage } from '../../actions/flashMessage.action';

import { getProfileData,
        updateProfileData,
        closeEditableItem,
        postProfileData } from '../../actions/profile.action';

class Profile extends PureComponent {
    componentDidMount() {
        this.props.getProfileData();
    }

    clickOverlay = () => {
        const {editingItem, editingValue} = this.props.profile;

        if(editingItem && editingItem !== 'hobbies') {
            this.props.updateProfileData(editingItem, editingValue);
        } else {
            this.props.closeEditableItem();
        }
    }

    renderFlashMessage = () => {
        if (this.props.flashMessage != null && this.props.flashMessage.msgType == 'error') {
            return (
                <div className='danger-notification-div'
                    style={{
                        width: '50%',
                        position: 'absolute',
                        top: '50px',
                        left: '25%',
                        zIndex: 100
                    }}
                >
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
        const { profile } = this.props;
        return (
            <div>
                {this.renderFlashMessage()}
                <div className='main-container'>
                    <div className='page-layout'>
                        <Image />
                        
                        <div className={'profile-item'}>
                            <label className='key'>First name:</label>
                            <XItem mykey={'firstName'}
                                validators={['required', 'matchRegexp:^[a-zA-Z]+$', 'matchRegexp:^[a-zA-Z]{1,16}$']}
                                errorMessages={['This field is required', 'Name can only contain latin letters', 'Name cannot be longer than 16 characters']}
                            /> 
                        </div>

                        <div className={'profile-item'}>
                            <label className='key'>Last name:</label>
                            <XItem mykey={'lastName'} 
                                validators={['required', 'matchRegexp:^[a-zA-Z-]+$', 'matchRegexp:^[a-zA-Z-]{1,16}$']}
                                errorMessages={['This field is required', 'Last Name can only contain latin letters', 'Last name cannot be longer than 16 characters']}
                            />    
                        </div>

                        <div className={'profile-item'}>
                            <label className='key'>Gender:</label>
                            <Gender mykey={'gender'} /> 
                        </div>
                        
                        <div className={'profile-item'}>
                            <label className='key'>Position:</label>    
                            <XItem mykey={'position'} /> 
                        </div>
                        
                        <div className={'profile-item'}>
                            <label className='key'>Job description:</label>        
                            <XItem mykey={'jobDescription'}
                            /> 
                        </div>
                        
                        <div className={'profile-item'}>
                            <label className='key'>Education:</label>    
                            <XItem  mykey={'education'} /> 
                        </div>
                        
                        <div className={'profile-item'}>
                            <label className='key'>Bio:</label>    
                            <XItem mykey={'bio'}
                                multiLine={true} 
                            /> 
                        </div>

                        <div className={'profile-item'}>
                            <label className='key'>Hobbies:</label>
                            <Hobbies  mykey={'hobbies'} />
                        </div>

                        <div className={'profile-item'}>
                            <label className='key'>Facebook link:</label>
                            <XItem mykey={'fbLink'}
                                validators={[ 'matchRegexp:^(?:(?:http|https):\/\/)?(?:www.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com\/[a-zA-Z\.0-9]+|me\/[a-zA-Z\.0-9]+)']}
                                errorMessages={['Wrong Facebook link']} 
                                
                            /> 
                        </div>

                        <div className={'profile-item'}>
                            <label className='key'>Email:</label>
                            <span className='right-column' style={{paddingTop: '10px'}}>{ profile.data.email }</span>
                        </div>
                    </div>
                    
                    <div onClick={this.clickOverlay} className='overlay'></div>     
                </div>
            </div>
        );
    }
} 

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        flashMessage: state.flashMessage
    }
}

const mapDisatchToProps = (dispatch) => {
    return bindActionCreators({
        getProfileData,
        updateProfileData,
        closeEditableItem,
        postProfileData,
        deleteFlashMEssage
    }, dispatch);
}

export default connect(mapStateToProps, mapDisatchToProps)(Profile);
