import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Notification} from 're-bulma';
import GeneralQuestion from './GeneralQuestion';
import TagQuestion from './TagQuestion';
import { deleteFlashMEssage } from '../../actions/flashMessage.action';
import './admin.sass';

class createQuestion extends PureComponent {

    state = {
        value: 'general_question'
    }

    handleDropDownChange = (event, index, value) => {
        this.setState({value})
    }

     renderFlashMessage = () => {
        if (this.props.flashMessage != null && this.props.flashMessage.msgType == 'error') {
            return (
                <div className='danger-notification-div' style={{position: 'fixed', top: 50, left: '50%', width: 1000, marginLeft: '-500px', zIndex: 100}}>
                    <Notification color="isDanger" enableCloseButton closeButtonProps={{
                        onClick: () => {
                            this.props.deleteFlashMEssage()
                        }
                    }}>
                        {this.props.flashMessage.text}
                    </Notification>
                </div>
            )
        } else if (this.props.flashMessage != null && this.props.flashMessage.msgType == 'success') {
            return (
                <div className='danger-notification-div' style={{position: 'fixed', top: 50, left: '50%', width: 1000, marginLeft: '-500px', zIndex: 100}}>
                    <Notification color="isSuccess" enableCloseButton closeButtonProps={{
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

    renderComponent = () => {
        switch (this.state.value) {
            case 'general_question':
                return <GeneralQuestion/>
            case 'tag_question':
                return <TagQuestion/>
        }
    }

    render() {
        return (
            <div>
                {this.renderFlashMessage()}
                <div className='create-question'>
                    <DropDownMenu value={this.state.value} style={{width: '400px', margin: 'auto', display: 'block'}}
                        autoWidth={false} onChange={this.handleDropDownChange}>
                        <MenuItem value={'general_question'} primaryText="General Question"/>
                        <MenuItem value={'tag_question'} primaryText="Tag Question"/>
                    </DropDownMenu>
                    {this.renderComponent()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {flashMessage: state.flashMessage};
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteFlashMEssage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(createQuestion);
