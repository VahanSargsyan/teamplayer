import React, { PureComponent } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import '../styles/login.sass';

class Login extends PureComponent {
	render() {
		return (
			<div className='container'>
				<div className='content'>
					<h1 className='h1'>
						The best way to FIT in
					</h1>
					<RaisedButton
						label='Sign in with Google'
						primary
						href='http://localhost:8081/auth/google'
					/>
				</div>
			</div>
		);
	}
}

export default Login;
