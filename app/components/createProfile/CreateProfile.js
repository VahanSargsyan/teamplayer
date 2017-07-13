import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import { Upload, message,  } from 'antd';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
class CreateProfile extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			firstName: this.props.user.firstName,
			lastName: this.props.user.lastName,
			gender: '',
			position: '',
			currentHobby: '',
			hobbies: [],
			jobDescription: '',
			fbLink: '',
			education: '',
			picture: this.props.user.picture,
			bio: ''
		};
	}
	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}
	handleRequestDelete = (hobby) => {
		const hobbies = [ ...this.state.hobbies ];
		hobbies.splice(this.state.hobbies.indexOf(hobby), 1);
		this.setState({ hobbies });
	}
	submit = () => {
		const { currentHobby, ...data } = this.state;
		fetch(`${FETCH_URL}/api/createProfile`, {
				method:'post',
				headers: new Headers({'Content-Type' : 'application/json'}),
				body : JSON.stringify(data),
				credentials: 'include'
			})
			.then(result => result.json())
			.then(result => {
				if (result.added === true) {
					this.props.history.replace("/training");
				}
			});
	}
	addChip = (e) => {
		const code = e.keyCode ? e.keyCode : e.which;
		if (code === 13) {
			const { currentHobby } = this.state;
			const index = this.state.hobbies.findIndex(hobby=>{
				return hobby.label === currentHobby
			})
			if (index != -1) {
				// this alert is *experimental* //
				alert('this hobby exist')
			} else {
				this.setState({
					hobbies: [...this.state.hobbies, {label: currentHobby}],
					currentHobby: ''
				});
			}
		}
	}
	onPictureChange = (info) => {
		const img = info.file.originFileObj;
		const reader = new FileReader();
		reader.addEventListener('load', () => this.setState({ picture: reader.result }));
		reader.readAsDataURL(img);
	}
	render() {
		const isDisabled =
			this.state.firstName != '' &&
			this.state.lastName != '' &&
			this.state.gender != '' &&
			this.state.position != '' ? false :
			true;
		const renderHobbies = this.state.hobbies.map(hobby => (
			<Chip
				key={hobby.label}
				onRequestDelete={() => this.handleRequestDelete(hobby)}
			>
				{hobby.label}
			</Chip>
		));
		return (
			<ValidatorForm className='main-container'
				onSubmit={this.submit}
				style={styles.background}
			>
				<div className='transformUp'>
					<Upload
						className='avatarDiv'
						customRequest={() => null}
						onChange={this.onPictureChange}
						showUploadList={false}
					>
						<img className='trainingPhoto' src={this.state.picture}  />
					</Upload>
					<br />
					<hr />
					<TextValidator
						style={styles.textfield}
						name = 'firstName'
						floatingLabelText='First Name'
						onChange = {this.handleChange}
						value = {this.state.firstName}
						validators={['required', 'matchRegexp:^[a-zA-Z]+$', 'matchRegexp:^[a-zA-Z]{2,16}$']}
						errorMessages={['This field is required', 'Name can contain only latin letters', 'Name must be between 2 and 16 characters']}
					/>
					<TextValidator
						style={styles.textfield}
						name='lastName'
						floatingLabelText='Last Name'
						onChange = {this.handleChange}
						value = {this.state.lastName}
						validators={['required', 'matchRegexp:^[a-zA-Z-]+$', 'matchRegexp:^[a-zA-Z-]{2,16}$']}
						errorMessages={['This field is required', 'Last Name can contain only latin letters', 'Last Name must be between 2 and 16 characters']}
					/>
					<br />
					<TextValidator
						style={styles.textfield}
						name = 'position'
						floatingLabelText='Position'
						onChange = {this.handleChange}
						value = {this.state.position}
						validators={['required', 'matchRegexp:^[a-zA-Z ]+$', 'matchRegexp:^[a-zA-Z ]{2,16}$']}
						errorMessages={['This field is required', 'Position can contain only latin letters', 'Position must be between 2 and 16 characters']}
					/>
					<TextValidator
						style={styles.textfield}
						name = 'fbLink'
						floatingLabelText='Fb link'
						onChange = {this.handleChange}
						value = {this.state.fbLink}
						validators={[ 'matchRegexp:^(?:(?:http|https):\/\/)?(?:www.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com\/[a-zA-Z\.0-9]+|me\/[a-zA-Z\.0-9]+)']}
						errorMessages={['Wrong Facebook link']}
					/>
					<br />
					<TextField
						style={{...styles.textfield, ...styles.radioButtonGroup}}
						name = 'education'
						floatingLabelText='Last Education'
						onChange = {this.handleChange}
						value = {this.state.education}
					/>
					<div
						style={styles.inline_block}
					>
						<RadioButtonGroup
							name='gender'
							label='Gender'
							style={styles.block}
							valueSelected = {this.state.gender}
							onChange={this.handleChange}
						>
							<RadioButton
								value='male'
								label='Male'
								style={styles.radioButton}
							/>
							<RadioButton
								value='female'
								label='Female'
								style={styles.radioButton}
							/>
						</RadioButtonGroup>
					</div>
					<TextField
						style={styles.hobby}
						name = 'currentHobby'
						hintText='After typing hit Enter'
						floatingLabelText='Hobbies'
						onChange = {this.handleChange}
						value = {this.state.currentHobby}
						onKeyPress = {this.addChip}
					/>
					<div style={styles.wrapper}>
						{renderHobbies}
					</div>
					<hr />
					<TextField
						name='jobDescription'
						floatingLabelText='Job Description'
						multiLine
						rows={2}
						onChange = {this.handleChange}
						value = {this.state.jobDescription}
					/>
					<br />
					<TextField
						name='bio'
						floatingLabelText='Bio'
						multiLine={true}
						rows={1}
						onChange = {this.handleChange}
						value = {this.state.bio}
					/>
					<br />
					<br />
					<br />
					<RaisedButton
						label='Submit'
						primary
						disabled={isDisabled}
						onClick={this.submit}
					/>
				</ div>
			</ValidatorForm>
		);
	}
}

const styles = {
	chip: {
		margin: 4,
		display: 'inline-block',
		float: 'left'
	},
	wrapper: {
		width: '60%',
		margin: 'auto',
		display: 'flex',
		flexWrap: 'wrap'
	},
	block: {
		width: `270px`,
		marginLeft  : 'auto',
		marginRight : 'auto',
		marginTop: '30px',
		marginBottom: '0',
		fontSize: '12px'
	},
	radioButton: {
		marginBottom: 13,
		width: '60px',
		display: 'inline-block'
	},
	textfield: {
		margin: '5px'
	},
	background: {
		textAlign: 'center',
		padding: '5% 0'
	},
	radioButtonGroup: {

	},
	hobby: {
		margin: '5px',
		width: '80%'
	},
	inline_block: {
		display: 'inline-block'
	}
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}
export default connect(mapStateToProps)(CreateProfile);
