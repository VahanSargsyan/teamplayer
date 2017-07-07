import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Chip from 'material-ui/Chip';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import './profile.sass';

import { updateProfileData, postProfileData } from '../../actions/profile.action';

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
        this.state = {mode: 'view', editingValue: ''};
    }

    edit = () => {
        this.setState({mode: 'edit'});
    }

    handleChange = (e) => {
        if (e.key === 'Enter') {
            this.submit();
        } else {
            this.setState({editingValue: e.target.value});    
        }
    }

    submit = () => {
        const list = this.props.data.hobbies.reduce((accumulator, hobby) => {
            return [...accumulator, {label: hobby.label}];
        }, []);

        const newList = {hobbies: [...list, {label: this.state.editingValue}]};
        
        this.props.postProfileData(newList);
        
        this.setState({mode: 'view', editingValue: ''});
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
        const { data, editingValue, mykey } = this.props;
        return (
            <div style={styles.wrapper} className='editable'>
                <label>{ this.props.label }:</label>
                { data.hobbies.length > 0 ? 
                    (  
                        data.hobbies.map((hobby) => <Chip 
                        key={hobby._id} 
                        style={styles.chip}
                        onRequestDelete={() => this.handleRequestDelete(hobby._id)}>{hobby.label}</Chip>) 
                    ) :  (null) 
                }

                {
                    this.state.mode == 'edit' ?
                    (
                        <div>
                            <ValidatorForm
                                onSubmit={this.submit}
                                style={{display: 'inline', padding: 0}}
                            >
                                <TextValidator
                                    name = 'First Name'
                                    onChange = {this.handleChange}
                                    value = {this.state.editingValue}
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
        editingValue: state.profile.editingValue
    }
}

const mapDisatchToProps = (dispatch) => {
    return bindActionCreators({
        updateProfileData,
        postProfileData
    }, dispatch);
}

export default connect(mapStateToProps, mapDisatchToProps)(Hobbies);
