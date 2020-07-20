import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { initializeIcons } from '@uifabric/icons';

// Initialize all icons that are going to be used.
initializeIcons();

ReactDOM.render(<App />, document.getElementById('root'));
