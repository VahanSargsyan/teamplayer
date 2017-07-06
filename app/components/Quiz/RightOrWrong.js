import React, { PureComponent } from 'react';

const RightOrWrong = ({ check, wasCorrect }) => {
	if (!check) return null;
	const style = wasCorrect ? {color: 'green'} : {color: 'red'};
	const message = wasCorrect ? 'Correct!' : 'Wrong...';
	return (
		<h2 style={{...style, textAlign: 'center', margin: '10px 0'}}>
			{message}
		</h2>
	)
}

export default RightOrWrong;