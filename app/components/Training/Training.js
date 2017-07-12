import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeTrainingStep, getTrainingData, changeRenderMsg} from '../../actions/training.action.js'
import trainingCss from './training.sass'
import RaisedButton from 'material-ui/RaisedButton'
import Typist from 'react-typist';
import {Link} from 'react-router-dom'
import LinearProgress from 'material-ui/LinearProgress'


const mapStateToProps = (state) => {
    return {
        employees: state.training.employees,
        trainingStep: state.training.trainingStep,
        renderMsg: state.training.renderMsg,
        finished: state.training.finished
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        changeTrainingStep,
        getTrainingData,
        changeRenderMsg
    }, dispatch)
}

class Training extends Component {
    constructor(props) {
        super(props);
        this.decreaseStep = this.changeTrainingStep.bind(this, -1)
        this.increaseStep = this.changeTrainingStep.bind(this, 1)
        this.state = {
            renderTyping: true
        }
    }
    componentDidMount() {
        this.props.getTrainingData()
    }
    finishSteps = () => {
        this.props.changeTrainingStep(null, 'finished', this.props.finished, ()=>{
            this.props.history.push('team')
        })
    }
    changeTrainingStep = (value) => {
        const nextStepIndex = this.props.trainingStep + value
        const nextStepId = this.props.employees[nextStepIndex]['_id']
        const finished = this.props.finished
        this.props.changeTrainingStep(nextStepIndex, nextStepId, finished, ()=>{
            this.setState({
                renderTyping: false
            }, () => {
                if(value > 0) {
                    this.setState({renderTyping: true})
                }
            })
        })

    }

    renderBackButton = () => {
		const isDisabled = this.props.trainingStep == 0;
		return (<RaisedButton
			label='Back'
			primary
			className='training-button'
			disabled={isDisabled}
			onTouchTap={this.decreaseStep}
		/>);
    }
    renderNextButton = () => {
		const last = this.props.trainingStep === this.props.employees.length - 1
		const onClick = last ? this.finishSteps : this.increaseStep;
		const label = last ? 'Finish' : 'Next';
		return (<RaisedButton
			label={label}
			primary
			className='training-button'
            onTouchTap={onClick}
		/>);
    }
    delayGen(mean, std, {line, lineIdx, charIdx, defDelayGenerator}) {
        if (lineIdx === 3 && charIdx === line.length - 1) {
            return 500;
        }
        if (lineIdx === 4 && charIdx === line.length - 1) {
            return 500;
        }
        if (lineIdx === 5 && charIdx === line.length - 1) {
            return 500;
        }
        return defDelayGenerator(mean + 25);
    }

    renderEmployeeInfo = () => {
        return (
            <div className='typistText'>
                <p>{employee.firstName} {employee.lastName}</p>
                <p> {employee.position}</p>
                <p>{employee.jobDescription}</p>
                {employee.hobbies.length > 0 &&(
                    <p>Hobbies: {employee.hobbies.map((hobby, i)=>{
                            return (<span key={hobby._id}>{hobby.label}
                                {employee.hobbies.length != i + 1 ? ',' :'' } </span>)
                        })}
                    </p>)}
            </div>
        )
    }
    render() {
        const {renderTyping} = this.state;
        if (this.props.employees.length > 0) {
            const employee = this.props.employees[this.props.trainingStep]
            return (
                <div className='main-container'>
                    <div className='avatarDiv'>
                        <img src={employee.picture} alt='avatar' className='trainingPhoto'/>
                    </div>
                    <p className='progress-text'>{this.props.trainingStep + 1} / {this.props.employees.length}</p>
                        <div className='training-info'>
                            {renderTyping && !this.props.finished ? (
                                <Typist cursor={{show: false }}  avgTypingSpeed={80}delayGenerator={this.delayGen} startDelay={500}>
                                    <div className='typist-text'>
                                        <p className='name'>{employee.firstName} {employee.lastName}</p>
                                        <p> {employee.position}</p>
                                        {employee.jobDescription != '' && (
                                        <p>{employee.jobDescription}</p>)}

                                        {employee.hobbies && employee.hobbies.length > 0 &&(
                                            <p>Hobbies - {employee.hobbies.map((hobby, i)=>{
                                                    return (<span key={hobby._id}>{hobby.label}
                                                        {employee.hobbies.length != i + 1 ? ',' :'' } </span>)
                                                })}
                                            </p>)}
                                    </div>
                                </Typist>
                            ) : (
                                <div className = 'Typist'>
                                    <div className='typist-text'>
                                        <p className='name'>{employee.firstName} {employee.lastName}</p>
                                        <p> {employee.position}</p>
                                        <p>{employee.jobDescription}</p>
                                        {employee.hobbies.length > 0 &&(
                                            <p>Hobbies - {employee.hobbies.map((hobby, i)=>{
                                                    return (<span key={hobby._id}>{hobby.label}
                                                        {employee.hobbies.length != i + 1 ? ',' :'' } </span>)
                                                })}
                                            </p>)}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="buttons">
                            {this.renderBackButton()}
                            {this.renderNextButton()}
                        </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Training)
