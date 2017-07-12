import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import EditableItem from './EditableItem';
import './profile.sass';

import { clickXItem, updateProfileData } from '../../actions/profile.action';

class XItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { data, mykey, editingValue } = this.props;
       
        if(this.props.editingItem ==  this.props.mykey) {
            return (
                <div className='editable right-column'>
                    <EditableItem mykey={mykey}
                        validators = {this.props.validators}
                        errorMessages = {this.props.errorMessages}
                        multiLine={this.props.multiLine}/>
                    <img className='save-img' src='/save.png'  onClick={this.props.updateProfileData.bind(this, mykey, editingValue)}/>
                </div>
            );
        } else {
            return (
                <div className='editable right-column' >
                    <span style={{paddingTop: '10px'}}>{ data[mykey] }</span>
                    <img className='edit-img' src='/edit.png' onClick={this.props.clickXItem.bind(this, mykey, data[mykey])}/>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.profile.data,
        editingItem: state.profile.editingItem,
        editingValue: state.profile.editingValue
    }
}

const mapDisatchToProps = (dispatch) => {
    return bindActionCreators({
        clickXItem,
        updateProfileData
    }, dispatch);
}

export default connect(mapStateToProps, mapDisatchToProps)(XItem);
