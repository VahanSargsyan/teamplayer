import React, { PureComponent } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import RightOrWrong from './RightOrWrong';

class PictureQuiz extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			selected: null
		}
	}
	render() {
		const check = this.props.correctAnswer != null;
		const wasCorrect = check && this.props.correctAnswer === this.props.selectedAnswer;
		const renderOptions = this.props.question.answers.map((answer, index) => {
			let labelStyle = {};
			if (check) {
				if (this.props.correctAnswer === index) {
					labelStyle = {color: 'green'};
				} else if (this.props.selectedAnswer === index) {
					labelStyle = {color: 'red'};
				}
			}
			return (
				<RadioButton
					disabled={check}
					key={index}
					value={index}
					label={answer}
					style={{margin: '10px 0'}}
					labelStyle={labelStyle}
				/>
		)});
		return (
			<div className='quiz'>
				<div className='answers'>
					<h1
						style={{textAlign: 'center'}}
					>
						Who is depicted in the picture?
					</h1>
					<RightOrWrong check={check} wasCorrect={wasCorrect} />
					<div className='image'>
						<img className='pic-img' src={this.props.question.who} />
					</div>
					<div className='options'>
						<RadioButtonGroup
							onChange={(e, selected) => this.setState({ selected })}
							valueSelected={this.state.selected}
							name='answers'
							children={renderOptions}
						/>
					</div>
				</div>
				<div className='quiz-button'>
					<RaisedButton
						disabled={!check && this.state.selected === null}
						primary
						label={this.props.done ? 'Submit' : 'Next'}
						onTouchTap={() => this.props.addAnswer(this.state.selected)}
					/>
				</div>
			</div>
		);
	}
}

export default PictureQuiz;