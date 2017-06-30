import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ErrorPage extends PureComponent {
    render() {
        return (
            <div>
                404 Not Found
            </div>
        );
    }
}

export default ErrorPage
