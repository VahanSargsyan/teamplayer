import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import './profile.sass';

import { changeXItemValue, closeEditableItem, updateProfileData } from '../../actions/profile.action';

const styles = {
    form: {
        display: 'inline', 
        padding: 0, 
        width: '100%',
        maxWidth: '350px'
    },

    textField: {
        width: '100%',
        fontSize: '16px',
        lineHeight: '21px',
        minHeight: '40px',
        height: '100%',
        fontWeight: 'normal',
        fontFamily: 'Raleway, sans-serif'
    }, 

    textArea: {
        width: '100%',
    }
}

class EditableItem extends PureComponent {
    constructor(props) {
        super(props);
    }
    
    submit = (e) => {
        if (e.key === 'Enter') {
            const { mykey, editingValue } = this.props;
            this.props.updateProfileData(mykey, editingValue);
        }
    }

    render() {
        const { editingValue, mykey, label } = this.props;
        return (
            <div style={styles.form}>
                <ValidatorForm
                    onSubmit={this.submit}
                    style={styles.form}
                >
                    <TextValidator
                        name = 'First Name'
                        onChange = {e => {this.props.changeXItemValue(mykey, e.target.value)}}
                        onKeyPress = {this.submit}
                        value = {editingValue}
                        validators = {this.props.validators}
                        errorMessages = {this.props.errorMessages}
                        multiLine={this.props.multiLine}
                        textareaStyle={styles.textArea}
                        style={styles.textField}
                    />
                </ValidatorForm>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        editingValue: state.profile.editingValue,
    }
}

const mapDisatchToProps = (dispatch) => {
    return bindActionCreators({
        changeXItemValue,
        updateProfileData
    }, dispatch);
}

export default connect(mapStateToProps, mapDisatchToProps)(EditableItem);
