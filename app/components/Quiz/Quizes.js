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
			if (progress == this.state.quizes.length) {
				this.props.history.push('/team');
			}
		} else {
			const answers = [...this.state.answers, choice];
			if (progress == this.state.quizes.length) {
				this.setState({ answers });
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
					style={{position: 'absolute', margin: 'auto'}}
					size={40}
					top={0}
					left={0}
					status='loading'
				/>
			)
		}
		return (
			<div className='quizHomePage' style={{position: 'relative'}}>
					<div style={{position: 'absolute',  fontSize: '20px'}}>
						{this.state.progress + 1}/ {this.state.quizes.length}
					</div>
					<CurrentQuestion
						question={this.state.quizes[this.state.progress]}
						addAnswer={this.addAnswer}
						done={this.state.progress == this.state.quizes.length - 1}
						correctAnswer={giveCorrectAnswers ?
							this.state.correctAnswers[this.state.progress] :
							null
						}
						selectedAnswer={giveCorrectAnswers ?
							this.state.answers[this.state.progress] :
							null
						}
					/>
			</div>
		);
	}
}

export default Quizes;
