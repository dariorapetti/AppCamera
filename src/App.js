import React from 'react';
import { Provider } from 'react-redux';

import store from './store';

// navigation
import MainNavigator from './navigation';

import { init } from './db';

init().then(() => {
    console.log('DB inicializada');
}).catch(err => {
    console.log('DB no inicializada', err);
});

export default function App() {
  return (<Provider store={store}><MainNavigator /></Provider>);
}
