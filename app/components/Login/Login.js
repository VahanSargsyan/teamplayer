import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextField from 'material-ui/TextField';

import change from '../../actions/test.action';

const mapStateToProps = ({ test }) => {
	return { test };
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		change
	}, dispatch);
}

class Layout extends PureComponent {
	render() {
		return (
			<div>
				<TextField
					name='testfield'
					floatingLabelText='test field'
					value={this.props.test}
					onChange={(e) => this.props.change(e.target.value)}
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
