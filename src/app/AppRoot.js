import React, { Component } from 'react';

import * as Routes from './screens';

export default class AppRoot extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      route: 'Home',
      another: 'key',
    };
  }
  render() {
    const Route = Routes[this.state.route];
    return <Route />;
  }
}
