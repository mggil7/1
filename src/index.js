import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import config from './aws-exports';
import Amplify from 'aws-amplify';
import { AmplifyProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/style.css';

Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <AmplifyProvider>
    <App />
    </AmplifyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);