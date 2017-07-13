import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { addFlashMessage } from '../../actions/flashMessage.action';

import styles from './gq-styles.js';

class GeneralQuestion extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: "custom",
            picture: '',
            text: '',
            answers: ['', '', '', ''],
            rightAnswer: ''
        }
    }

    submit = () => {
        if(this.state.rightAnswer == '') {
            this.props.addFlashMessage('No right answer chosen', 'error');
        } else {
            const url = '/api/admin/question';
            const options =  {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state)
            };

            fetch(url, options).then(response => {
                if(response.status == 200) {
                    this.props.addFlashMessage('Added question successfully!', 'success');
                    this.setState({
                        type: "custom",
                        picture: '',
                        text: '',
                        answers: ['', '', '', ''],
                        rightAnswer: ''
                    });
                } else {
                    this.props.addFlashMessage('Error occured', 'error');
                }
            });             
        }
    }

    handleQuestion = ({ target }) => {
        this.setState({ text: target.value })
    }

    handlePic = (e) => {
        const file = this.refs.file.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({ picture: reader.result })
        }.bind(this);
    }

    handleAnswer = ({ target }) => {
        const answers = this.state.answers.slice();
        const i = parseInt(target.name);
        answers[i] = target.value;
        this.setState({answers})
    }

    handleRightAnswer = ({ target }) => {
        this.setState({rightAnswer: parseInt(target.value)});
    }

    render() {
        return (
            <div style={styles.container}>
                <ValidatorForm  onSubmit={this.submit}
                    style={styles.form}>
                    <div style={styles.field}> 
                        <TextValidator
                            name = 'questionText'
                            floatingLabelText='Question'
                            onChange = {this.handleQuestion}
                            value = {this.state.text} 
                            style = {styles.text}
                            validators={['required']}
						    errorMessages={['This field is required']}/>
                    </div>

                    <div style={styles.field}>    
                        <label htmlFor='pic' style={styles.upload}>Upload picture</label>
                        <input type='file'
                            onChange={this.handlePic}
                            accept='image/*'
                            id='pic'
                            ref="file" 
                            multiple="true"
                            style={styles.file} />
                    </div>

                    <div style={styles.field}>  
                    {
                        this.state.picture ? (
                            <img src={this.state.picture}
                            style={styles.picture} />
                        ) : ( null )
                    }              
                    </div>

                    <div style={styles.answersContainer}>
                        <RadioButtonGroup name = 'answers' 
                            valueSelected = {this.state.rightAnswer.toString()} 
                            onChange={this.handleRightAnswer}
                            style={styles.radioGroup}>
                                <RadioButton value={'1'} name='option1'/>
                                <RadioButton value={'2'} name='option2'/>
                                <RadioButton value={'3'} name='option3'/>
                                <RadioButton value={'4'} name='option4'/>
                        </RadioButtonGroup>

                        <div style = { styles.optionsGroup }>
                            <div style={styles.field}> 
                                <TextValidator
                                    name = '0'
                                    floatingLabelText='Option 1'
                                    onChange = {this.handleAnswer}
                                    value = {this.state.answers[0]} 
                                    style = {styles.answer}
                                    validators={['required']}
						            errorMessages={['This field is required']} />
                            </div>

                            <div style={styles.field}> 
                                <TextValidator
                                    name = '1'
                                    floatingLabelText='Option 2'
                                    onChange = {this.handleAnswer}
                                    value = {this.state.answers[1]} 
                                    style = {styles.answer}
                                    validators={['required']}
						            errorMessages={['This field is required']}/>
                            </div>

                            <div style={styles.field}> 
                                <TextValidator
                                    name = '2'
                                    floatingLabelText='Option 3'
                                    onChange = {this.handleAnswer}
                                    value = {this.state.answers[2]} 
                                    style = {styles.answer}
                                    validators={['required']}
						            errorMessages={['This field is required']}/>
                            </div>

                            <div style={styles.field}> 
                                <TextValidator
                                    name = '3'
                                    floatingLabelText='Option 4'
                                    onChange = {this.handleAnswer}
                                    value = {this.state.answers[3]} 
                                    style = {styles.answer}
                                    validators={['required']}
						            errorMessages={['This field is required']}/>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{marginLeft: 'auto', marginRight: 'auto', width: '100px', marginTop: '10px'}}>
                        <RaisedButton
                            label='Submit'
                            type='submit'
                            primary
                            style={styles.submit} />
                    </div>
                </ValidatorForm>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addFlashMessage
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(GeneralQuestion);