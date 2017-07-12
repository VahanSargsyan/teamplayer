import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeEditableItem,
        updateProfileData } from '../../actions/profile.action';

const styles = {
    groupStyle: {
        display: 'flex',
        width: 300,
        margin: 0
    },

    radioStyle: {
        width: 100 
    },

    labelStyle: {
        fontWeight: 'normal'
    }
}

class Image extends PureComponent {
    constructor(props) {
        super(props);
    }

    imageClick = () => {
        this.refs.file.click();
    }

    onChange = () => {   
        const file = this.refs.file.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.props.updateProfileData('picture', reader.result);
        }.bind(this);
    }

    render() {
        const { profile } = this.props;
        return (
            <div className={'profile-div'}>
                <input type="file" 
                    accept = "image/*"
                    name="picture" 
                    ref="file" 
                    multiple="true"
                    onChange={this.onChange}
                    style={{visibility: 'hidden', position: 'absolute'}}/>
                
                <div className='image-wrapper' onClick={this.imageClick}>
                    <img src={ profile.data.picture } className='profile-img'/>
                
                    <div className='image-hover'>Click to update</div>
                </div>
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
        updateProfileData
    }, dispatch);
}

export default connect(mapStateToProps, mapDisatchToProps)(Image);
