import React, { Component } from 'react';

import { Provider } from 'react-redux';
import AppRoot from './app/AppRoot';

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <AppRoot />
      </Provider>
    );
  }
}

export default App;
