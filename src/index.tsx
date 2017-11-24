import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './_library/registerServiceWorker';
import './index.css';
import { RootState } from './app/reducer';
import { configureStore } from './app/store';
import { App } from './app/components/App';
import { getAppIdentityFromLocalStorage } from './app/utils/app-identity';
import { ROUTER_BASENAME } from './app/config/routes';

let initialState: RootState = {};

// already signed in?
let identity = getAppIdentityFromLocalStorage();
if (identity) {
    initialState.auth = { identity };
}

export const appStore = configureStore(initialState);

ReactDOM.render(
    <Provider store={appStore}>
        <Router basename={ROUTER_BASENAME}>
            <App />
        </Router>
    </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
