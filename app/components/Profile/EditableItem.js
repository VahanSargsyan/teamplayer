import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import './profile.sass';

import { changeXItemValue, closeEditableItem, updateProfileData } from '../../actions/profile.action';

const styles = {
    textField: {
        width: '200px',
        height: '40px'
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
            <div className='editable'>
                <label>{ this.props.label }</label>
                <ValidatorForm
                    onSubmit={this.submit}
                    style={{display: 'inline', padding: 0}}
                >
                    <TextValidator
                        name = 'First Name'
                        onChange = {e => {this.props.changeXItemValue(mykey, e.target.value)}}
                        onKeyPress = {this.submit}
                        value = {editingValue}
                        validators = {this.props.validators}
                        errorMessages = {this.props.errorMessages}
                        multiLine={this.props.multiLine}
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
