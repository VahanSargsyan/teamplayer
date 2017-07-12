import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Chip from 'material-ui/Chip';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { lightBlue300 } from 'material-ui/styles/colors';
import './profile.sass';

import { updateProfileData, 
        postProfileData, 
        closeEditableItem,
        clickXItem,
        changeXItemValue } from '../../actions/profile.action';

const styles = {
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

class Hobbies extends PureComponent {
    constructor(props) {
        super(props);
    }

    edit = () => {
        this.props.clickXItem(this.props.mykey, '');
    }

    handleChange = (e) => {
        if (e.key === 'Enter') {
            this.submit();
        } else {
            this.props.changeXItemValue(this.props.mykey, e.target.value)
        }
    }

    submit = () => {
        if(this.props.editingValue.trim() != '') {
            const list = this.props.data.hobbies.reduce((accumulator, hobby) => {
                return [...accumulator, {label: hobby.label}];
            }, []);

            const newList = {hobbies: [...list, {label: this.props.editingValue}]};
            
            this.props.postProfileData(newList);
        }
        this.props.closeEditableItem();
    }

    handleRequestDelete = (_id) => {
        const newList = this.props.data.hobbies.reduce((accumulator, hobby) => {
            if(hobby._id == _id) {
                return [...accumulator];
            } else {
                return [...accumulator, hobby];
            }
        }, []);

        this.props.updateProfileData(this.props.mykey, newList);
    }

    render() {
        const { data, editingItem, editingValue, mykey } = this.props;
        return (
            <div style={styles.wrapper} className='editable right-column'>
                { data.hobbies.length > 0 ? 
                    (  
                        data.hobbies.map((hobby) => <Chip 
                            key={hobby._id} 
                            style={styles.chip}
                            backgroundColor={lightBlue300}
                            labelStyle={{color: '#FFF', paddingTop: 0}}
                            onRequestDelete={() => this.handleRequestDelete(hobby._id)}>{hobby.label}</Chip>) 
                    ) :  (null) 
                }

                {
                    editingItem ==  mykey ?
                    (
                        <div style={{display: 'block'}}>
                            <ValidatorForm
                                onSubmit={this.submit}
                                style={{display: 'inline', padding: 0}} 
                            >
                                <TextValidator
                                    name = 'First Name'
                                    onChange = {this.handleChange} 
                                    value = {editingValue}
                                    style={{height: '40px'}}
                                />
                            </ValidatorForm>
            
                            <img className='save-img' src='/save.png' onClick={this.submit}/>
                        </div>
                    ) : (<img className='edit-img' src='/edit.png' onClick={this.edit}/>)
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.profile.data,
        editingValue: state.profile.editingValue,
        editingItem: state.profile.editingItem
    }
}

const mapDisatchToProps = (dispatch) => {
    return bindActionCreators({
        clickXItem,
        changeXItemValue,
        closeEditableItem,
        updateProfileData,
        postProfileData
    }, dispatch);
}

export default connect(mapStateToProps, mapDisatchToProps)(Hobbies);
