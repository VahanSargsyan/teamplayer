import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import XItem from './XItem';
import Hobbies from './Hobbies';
import './profile.sass';

import { closeEditableItem,
        updateProfileData } from '../../actions/profile.action';

const styles = {
    groupStyle: {
        display: 'flex',
        width: 200,
        margin: 0,
        zIndex: 5
    },

    radioStyle: {
        width: 100
    },

    labelStyle: {
        fontWeight: 'normal',
        fontFamily: 'Raleway, sans-serif',
        fontSize: '16px'
    }
}

class Gender extends PureComponent {
    constructor(props) {
        super(props);
    }

    handleChangeGender = (e) => {
        this.props.updateProfileData(this.props.mykey, e.target.value);
    }

    render() {
        const { profile } = this.props;
        return (
            <div style={{display: 'flex', marginBottom: '10px', paddingTop: '10px'}} className='right-column'>
                <RadioButtonGroup name="gender" 
                                defaultSelected="male"
                                valueSelected = {profile.data.gender} 
                                onChange={this.handleChangeGender}
                                style={styles.groupStyle}>
                    <RadioButton
                        value="male"
                        label="male"
                        labelStyle={styles.labelStyle}
                        style={styles.radioStyle}
                    />
                    <RadioButton
                        value="female"
                        label="female"
                        labelStyle={styles.labelStyle}
                        style={styles.radioStyle}
                    />
                </RadioButtonGroup>
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
        updateProfileData,
        closeEditableItem
    }, dispatch);
}

export default connect(mapStateToProps, mapDisatchToProps)(Gender);
