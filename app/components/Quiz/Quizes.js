import React, { PureComponent } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import FlatButton from 'material-ui/FlatButton';
import NameQuiz from './NameQuiz';
import PictureQuiz from './PictureQuiz';
import './quiz.sass';

class Quizes extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			quizes: [],
			answers: [],
			correctAnswers: [],
			progress: 0,
			loading: true
		};
	}
	componentDidMount() {
		const options = { method: 'get', credentials: 'include' };
		fetch(`${FETCH_URL}/api/quiz`, options)
			.then(quizesData => quizesData.json())
			.then(quizes => this.setState({ loading: false, quizes }));
	}
	addAnswer = (choice) => {
		const progress = this.state.progress + 1;
		if (this.state.correctAnswers.length) {
			const progress = this.state.progress + 1;
			this.setState({ progress });
			if (progress == 10) {
				this.props.history.push('/grid');
			}
		} else {
			const answers = [...this.state.answers, choice];
			if (progress == 10) {
				this.submitAnswers(answers);
			} else {
				this.setState({ answers, progress });
			}
		}
		window.scrollTo(0, 0);
	}
	submitAnswers = (answers) => {
		this.setState({ loading: true });
		const options = {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ answers }),
			credentials: 'include'
		};
		fetch(`${FETCH_URL}/api/quiz`, options)
			.then(correctAnswersData => correctAnswersData.json())
			.then(correctAnswers => this.setState({
				loading: false,
				progress: 0,
				correctAnswers
			}));
	}
	render() {
		const giveCorrectAnswers = !!this.state.correctAnswers.length;
		const CurrentQuestion = (props) => {
			switch (props.question.type) {
				case 'picture':
					return <PictureQuiz {...props} />
				case 'name':
					return <NameQuiz {...props} />
			}
		}
		if (this.state.loading) {
			return (
				<RefreshIndicator
					size={40}
					top={100}
					left={100}
					status="loading"
				/>
			)
		}
		return (
			<div className='quizHomePage'>
				<CurrentQuestion
					question={this.state.quizes[this.state.progress]}
					addAnswer={this.addAnswer}
					done={this.state.progress == 9}
					correctAnswer={giveCorrectAnswers ?
						this.state.correctAnswers[this.state.progress] :
						null
					}
					selectedAnswer={giveCorrectAnswers ?
						this.state.answers[this.state.progress] :
						null
					}
				/>
				<div style={{width: '60%'}}>
					<LinearProgress
						mode='determinate'
						value={(this.state.progress + 1) * 10}
					/>
				</div>
			</div>
		);
	}
}

export default Quizes;