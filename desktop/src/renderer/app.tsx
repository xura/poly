import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { make as App } from './Reason';
import 'typeface-roboto';
import './app.global.scss'

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

ReactDOM.render(
    <App />,
    mainElement
);