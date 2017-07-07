import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import XItem from './XItem';
import Hobbies from './Hobbies';
import Gender from './Gender';
import Image from './Image';
import './profile.sass';

import { getProfileData,
        closeEditableItem } from '../../actions/profile.action';

class Profile extends PureComponent {
    componentDidMount() {
        this.props.getProfileData();
    }

    render() {
        const { profile } = this.props;
        return (
            <div>
                <div className='page-layout'>
                    <div className='left-side'>
                        <Image />
                    </div>
                    
                    <div className='right-side'>

                        <XItem label={'First name'}
                            mykey={'firstName'}
                            validators={['required', 'matchRegexp:^[a-zA-Z]+$', 'matchRegexp:^[a-zA-Z]{1,16}$']}
                            errorMessages={['This field is required', 'Name can only contain latin letters', 'Name cannot be longer than 16 characters']}/> 
                    
                        <XItem label={'Last name'}
                            mykey={'lastName'} 
                            validators={['required', 'matchRegexp:^[a-zA-Z-]+$', 'matchRegexp:^[a-zA-Z-]{1,16}$']}
                            errorMessages={['This field is required', 'Last Name can only contain latin letters', 'Last name cannot be longer than 16 characters']}/> 

                        <Gender label={'Gender'}
                            mykey={'gender'}/> 
                        
                        <XItem label={'Position'}
                            mykey={'position'} /> 

                        <XItem label={'Job Description'}
                            mykey={'jobDescription'} /> 

                        <XItem label={'Education'}
                            mykey={'education'} /> 

                        <XItem label={'Bio'}
                            mykey={'bio'}
                            multiLine={true} /> 
                        
                        <Hobbies label={'Hobbies'}
                            mykey={'hobbies'}/>

                        <XItem label={'Facebook link'}
                            mykey={'fbLink'}
                            validators={[ 'matchRegexp:(?:http://|https://)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?']}
                            errorMessages={['Wrong Facebook link']} /> 

                        <div>
                            <label>Email:</label><span>{ profile.data.email }</span>
                        </div>
                    </div>
                </div>
                <div onClick={this.props.closeEditableItem.bind(this)} className='overlay'></div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    }
}

const mapDisatchToProps = (dispatch) => {
    return bindActionCreators({
        getProfileData,
        closeEditableItem
    }, dispatch);
}

export default connect(mapStateToProps, mapDisatchToProps)(Profile);
