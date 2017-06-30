import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeTrainingStep, getTrainingData, changeRenderMsg} from '../../actions/training.action.js'
import trainingCss from './training.sass'
import RaisedButton from 'material-ui/RaisedButton'
import Typist from 'react-typist';


const mapStateToProps = (state) => {
    return {
        employees: state.training.employees,
        trainingStep: state.training.trainingStep,
        renderMsg: state.training.renderMsg
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
    changeTrainingStep = (value, fn) => {
        const nextStepIndex = this.props.trainingStep + value
        const nextStepId = this.props.employees[nextStepIndex]['_id']
        this.props.changeTrainingStep(nextStepIndex, nextStepId, ()=>{
            this.setState({
                renderTyping: false
            }, () => this.setState({renderTyping: true}))
        })

    }

    renderBackButton = () => {
        if (this.props.trainingStep != 0) {
            return <RaisedButton label="Back" secondary={true} className='button'
                onTouchTap={this.decreaseStep}/>
        }
    }
    renderNextButton = () => {

        if (this.props.trainingStep === this.props.employees.length - 1) {

            return <RaisedButton label="Finish" secondary={true} className='button'/>
        } else {
            return <RaisedButton label="Next" secondary={true} className='button'
                onTouchTap={this.increaseStep}/>
        }
    }

    render() {
        const {renderTyping} = this.state;
        if (this.props.employees.length > 0) {
            const employee = this.props.employees[this.props.trainingStep]
            return (
                <div className='trainingContainer'>
                    <img src={employee.image} alt='avatar' className='imployeeImage'/>
                    <div className='trainingInfo'>
                        {this.renderBackButton()}
                        {this.renderNextButton()}
                        {renderTyping && (
                            <Typist>
                                <div>
                                    <p>I am {employee.firstName}</p>
                                    <p> {employee.position}</p>
                                    <p>{employee.jobDescription}</p>
                                    <p>I like {employee.hobbies.map((hobby, id)=>{
                                        return <span key={id}>{hobby} </span>
                                    })}</p>
                                </div>
                            </Typist>
                        )}
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Training)
