/* eslint-disable*/
import React, { PureComponent } from 'react';

import Root from './root';

import WithGlobalContext from 'hoc/GlobalContext/WithGlobalContext';

class App extends PureComponent {
  render() {
    return (
      <WithGlobalContext>
        <Root />
      </WithGlobalContext>
    );
  }
}

export default App;
