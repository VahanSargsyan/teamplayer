import React, { PureComponent } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FlatButton from 'material-ui/FlatButton';
import RightOrWrong from './RightOrWrong';

class NameQuiz extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			selected: null
		}
	}
	render() {
		const check = this.props.correctAnswer != null;
		const wasCorrect = check && this.props.correctAnswer === this.props.selectedAnswer;
		const renderOptions = this.props.question.answers.map((answerImg, index) => {
			let style = {};
			if (check) {
				if (this.props.correctAnswer === index) {
					style = {border: '2px solid green'};
				} else if (this.props.selectedAnswer === index) {
					style = {border: '2px solid red'};
				}
			} else {
				style = this.state.selected === index ? 
					{border: '2px solid #00bcd4', cursor: 'pointer'} :
					{cursor: 'pointer'}
			}
			return <img
						key={index}
						className='name-img'
						src={answerImg}
						style={{...style, marginTop: '40px'}}
						onTouchTap={check ? null : () => this.setState({ selected: index })}
					/>
		});
		return (
			<div className='quiz'>
				<div className='answers'>
					<h1
						style={{textAlign: 'center'}}
					>
						Select {this.props.question.who} from the pictures
					</h1>
					<RightOrWrong check={check} wasCorrect={wasCorrect} />
					<div className='name-options'>
						{renderOptions}
					</div>
				</div>
				<div className='button'>
					<FlatButton
						disabled={!check && this.state.selected === null}
						primary
						style={{marginTop: '20px'}}
						label={this.props.done ? 'Submit' : 'Next'}
						onTouchTap={() => this.props.addAnswer(this.state.selected)}
					/>
				</div>
			</div>
		);
	}
}

export default NameQuiz;