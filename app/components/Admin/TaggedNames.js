import React, {PureComponent} from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import RaisedButton from 'material-ui/RaisedButton'

class TaggedNames extends PureComponent {


    onUpdateInput = (id, value) => {
        this.props.handleInputChange(id, value)
    }
    render() {
        return (
            <div className='right-part'>
                {this.props.tags.map((tag, i)=>{
                    return (
                        <div style={{position: 'relative', display: 'flex'}} key={tag.id}>
                            <span className='count'>{i + 1}</span>
                            <AutoComplete style={{flex: '2'}}
                                id={tag.id}
                                hintText="Type anything"
                                dataSource={this.props.dataSource}
                                floatingLabelText="Name Surname"
                                fullWidth={true}
                                onUpdateInput = {this.onUpdateInput.bind(this, tag.id)}
                                openOnFocus
                            />
                            <span className='delete' id = {tag.id} onClick={this.props.removeTagHandler}></span>
                        </div>
                    )
                })}
                {this.props.tags.length > 0 && (
                    <div className='submit-btn'>
                        <RaisedButton label="Submit" primary onTouchTap={this.props.submit}/>
                    </div>
                )}
            </div>
        );
    }
}

export default TaggedNames
