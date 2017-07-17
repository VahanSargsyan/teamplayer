import React, { PureComponent } from 'react';
import RightOrWrong from './RightOrWrong';
import RaisedButton from 'material-ui/RaisedButton';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import './quiz.sass';

const SortableItem = SortableElement(({value}) => {
		const style ={
			display: 'flex',
			height: 60,
			alignItems: 'center',
			width: '100%',
			padding: '0 20px',
			backgroundColor: '#fff',
			borderBottom: '1px solid #efefef',
			boxSizing: 'border-box'
		};
		return <div style={style}>{value}</div>
	}
);

const SortableList = SortableContainer(({items}) => {
	return (
		<div className='sortable-list'>
			{items.map((value, index) => (
				<SortableItem key={value} index={index} value={value} />
			))}
		</div>
  );
});

class TagQuiz extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			list: props.question.answers
		};
	}
	componentDidMount() {
		if (this.props.correctAnswer != null) {
			const correctAnswersArray = this._toArray(this.props.correctAnswer);
			const list = correctAnswersArray.map(digit => {
				return this.props.question.answers[digit - 1];
			});
			this.setState({ list });
		}
	}
	handleSort = ({oldIndex, newIndex}) => {
		const list = arrayMove(this.state.list, oldIndex, newIndex);
		this.setState({ list });
	}
	handleSubmit = () => {
		let result = 0;
		this.state.list.forEach((item, idx) => {
			result += Math.pow(10, this.state.list.length - 1 - idx) * this._answerIndex(item);
		})
		this.props.addAnswer(result);
	}
	_toArray = (num) => {
		const removeLast = (num) => [num % 10, Math.floor(num / 10)];
		const { length } = num.toString();
		const arr = new Array(length);
		for (let i = 0; i < length; i++) {
			[arr[length - (i + 1)], num] = removeLast(num);
		}
		return arr;
	}
	_answerIndex = (answer) => {
		return this.props.question.answers.indexOf(answer) + 1;
	}
	render() {
		const check = this.props.correctAnswer != null;
		const wasCorrect = check && this.props.correctAnswer === this.props.selectedAnswer;
		return (
			<div className='quizHomePage'>
			<div className='quiz'>
				<h1>
					Reorder the list according to the picture
				</h1>
				<RightOrWrong check={check} wasCorrect={wasCorrect} />
				<img src={this.props.question.who.picture} />
				<SortableList
					items={this.state.list}
					onSortEnd={this.handleSort}
					shouldCancelStart={() => check}
				/>
				<div className='quiz-button'>
					<RaisedButton
						primary
						label={this.props.done ? 'Submit' : 'Next'}
						onTouchTap={this.handleSubmit}
					/>
				</div>
			</div>
			</div>
		);
	}
}

export default TagQuiz;