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
            return <RaisedButton label="Back" primary={true} className='button'
                onTouchTap={this.decreaseStep}/>
        }
    }
    renderNextButton = () => {

        if (this.props.trainingStep === this.props.employees.length - 1) {

            return <RaisedButton label="Finish" primary={true} className='button'
                 containerElement={<Link to="/team" />} />


        } else {
            return <RaisedButton label="Next" primary={true} className='button'
                onTouchTap={this.increaseStep}/>
        }
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


    render() {
        const {renderTyping} = this.state;
        if (this.props.employees.length > 0) {
            const employee = this.props.employees[this.props.trainingStep]
            return (
                <div className='trainingContainer'>
                    <h1>Meet our team members</h1>
                    <div className='trainingInfo'>
                        <div className="avatar">
                            <img src={employee.picture} alt='avatar' className='imployeeImage'/>
                        </div>
                        {renderTyping && (
                            <Typist cursor={{show: false }}  avgTypingSpeed={60}
                                        delayGenerator={this.delayGen}
                                        startDelay={500}>
                                <div className="typistText">
                                    <p>{employee.firstName} {employee.lastName}</p>
                                    <p> {employee.position},  {employee.jobDescription}</p>
                                        <p>Hobbies: {employee.hobbies.map(hobby=>{
                                            return <span key={hobby._id}>{hobby.label},  </span>
                                        })}</p>
                                </div>
                            </Typist>
                        )}
                    </div>
                    <div className="buttons">
                        {this.renderBackButton()}
                        {this.renderNextButton()}
                        <LinearProgress mode="determinate" style={{"height": "25px", "margin-top": "40px"}}
                             value={this.props.trainingStep  * 100 / (this.props.employees.length-1 )} />
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Training)
