import React, {PureComponent} from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SweetAlert from 'sweetalert-react';
import '../../../node_modules/sweetalert/dist/sweetalert.css'
import styles from './gq-styles.js';

class GeneralQuestion extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                type: "custom",
                picture: '',
                text: '',
                answers: ['', '', '', ''],
                rightAnswer: 'null'
            },
            success: '',
            error: ''
        }
    }

    submit = () => {
        if(this.state.data.rightAnswer == 'null') {
           this.setState({error: 'No right answer chosen'});
        } else {
            const url = '/api/admin/question';
            const options =  {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.data)
            };

            fetch(url, options).then(response => {
                if(response.status == 200) {
                    this.setState({
                        data: {
                            type: "custom",
                            picture: '',
                            text: '',
                            answers: ['', '', '', ''],
                            rightAnswer: ''
                        },
                        success: 'Successfully added new question '
                    });
                } else {
                    this.setState({error: 'Error occured'});
                }
            });             
        }
    }

    handleQuestion = ({ target }) => {
        this.setState({ data: {...this.state.data, text: target.value }})
    }

    handlePic = (e) => {
        const file = this.refs.file.files[0];
        if(file.size >= 1024 * 1024 * 2) {
            this.setState({error: 'Image size cannot be larger than 2MB'});
            return;
        } 
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({ data: {...this.state.data, picture: reader.result }})
        }.bind(this);
    }

    deletePicture = () => {
        this.setState({data: {...this.state.data, picture: ''}});
        this.refs.file.value = '';
    }

    handleAnswer = ({ target }) => {
        const answers = this.state.data.answers.slice();
        const i = parseInt(target.name);
        answers[i] = target.value;
        this.setState({data: {...this.state.data, answers}})
    }

    handleRightAnswer = ({ target }) => {
        this.setState({data: {...this.state.data, rightAnswer: parseInt(target.value)}});
    }

    render() {
        return (
            <div>
                <SweetAlert
                    show={Boolean(this.state.error)}
                    html
                    type={'warning'}
                    title={`<p style="font-size: 20px">${this.state.error}</p>`}
                    onConfirm={() => this.setState({ error: '' })}
                />

                <SweetAlert
                    show={Boolean(this.state.success)}
                    html
                    type={'success'}
                    title={`<p style="font-size: 20px">${this.state.success}</p>`}
                    onConfirm={() => this.setState({ success: '' })}
                />
                <div style={styles.container}>
                    <ValidatorForm  onSubmit={this.submit}
                        style={styles.form}>
                        <div style={styles.field}> 
                            <TextValidator
                                name = 'questionText'
                                floatingLabelText='Question'
                                onChange = {this.handleQuestion}
                                value = {this.state.data.text} 
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
                            this.state.data.picture ? (
                                <div style={styles.pictureContainer}>
                                    <img src={this.state.data.picture}
                                    style={styles.picture} />
                                    <img src={'/cross.svg'} onClick={this.deletePicture} style={styles.deletePicture}/>
                                </div>
                            ) : ( null )
                        }              
                        </div>

                        <div style={styles.answersContainer}>
                            <RadioButtonGroup name = 'answers' 
                                valueSelected = {this.state.data.rightAnswer.toString()} 
                                onChange={this.handleRightAnswer}
                                style={styles.radioGroup}>
                                    <RadioButton value={'0'} name='option1'/>
                                    <RadioButton value={'1'} name='option2'/>
                                    <RadioButton value={'2'} name='option3'/>
                                    <RadioButton value={'3'} name='option4'/>
                            </RadioButtonGroup>

                            <div style = { styles.optionsGroup }>
                                <div style={styles.field}> 
                                    <TextValidator
                                        name = '0'
                                        floatingLabelText='Option 1'
                                        onChange = {this.handleAnswer}
                                        value = {this.state.data.answers[0]} 
                                        style = {styles.answer}
                                        validators={['required']}
                                        errorMessages={['This field is required']} />
                                </div>

                                <div style={styles.field}> 
                                    <TextValidator
                                        name = '1'
                                        floatingLabelText='Option 2'
                                        onChange = {this.handleAnswer}
                                        value = {this.state.data.answers[1]} 
                                        style = {styles.answer}
                                        validators={['required']}
                                        errorMessages={['This field is required']}/>
                                </div>

                                <div style={styles.field}> 
                                    <TextValidator
                                        name = '2'
                                        floatingLabelText='Option 3'
                                        onChange = {this.handleAnswer}
                                        value = {this.state.data.answers[2]} 
                                        style = {styles.answer}
                                        validators={['required']}
                                        errorMessages={['This field is required']}/>
                                </div>

                                <div style={styles.field}> 
                                    <TextValidator
                                        name = '3'
                                        floatingLabelText='Option 4'
                                        onChange = {this.handleAnswer}
                                        value = {this.state.data.answers[3]} 
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
            </div>
        );
    }
}

export default GeneralQuestion;