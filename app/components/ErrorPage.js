import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ErrorPage extends PureComponent {
    render() {
        return (
            <div  id="error_video">
                <video poster="https://www.theuselesswebindex.com//static/videos/error.jpg" autoPlay loop>
                    <source src="https://www.theuselesswebindex.com//static/videos/error.mp4" type="video/mp4"/>
                    <source src="https://www.theuselesswebindex.com//static/videos/error.ogv" type="video/ogg"/>
                    <source src="https://www.theuselesswebindex.com//static/videos/error.webm" type="video/webm"/>
                </video>
                <div className="colum_c">
                    <h3>we are looking for your page...but we can't find it</h3>
                </div>
            </div>

        );
    }
}

export default ErrorPage
