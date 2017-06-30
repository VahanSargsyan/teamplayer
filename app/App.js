import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './reducers/store';
import Layout from './components/Layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles/style.sass';

const App = () => {
    injectTapEventPlugin();
    return (
        <Router>
            <MuiThemeProvider>
                <Provider store={store}>
                    <Layout/>
                </Provider>
            </MuiThemeProvider>
        </Router>
    );
}

render(<App />, document.getElementById("app"));
