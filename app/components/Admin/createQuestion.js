import React, {PureComponent} from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Notification} from 're-bulma';
import GeneralQuestion from './GeneralQuestion';
import TagQuestion from './TagQuestion';
import './admin.sass';

class createQuestion extends PureComponent {

    state = {
        value: 'general_question'
    }

    handleDropDownChange = (event, index, value) => {
        this.setState({value})
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

export default createQuestion;
