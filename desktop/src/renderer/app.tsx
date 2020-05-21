import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider, shallowEqual } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import Application from './components/Application';
import store from './store';
import { entry } from './Reason';
import 'typeface-roboto';
import './app.global.scss'

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                {entry()}
            </Provider>
        </AppContainer>,
        mainElement
    );
};

render(Application);
