import * as React from "react";
import { storiesOf } from '@storybook/react';

import Chrome from '../Chrome';
import MainScreen from './MainScreen';

storiesOf('MainScreen', module)
  .add('base', () => (
    <MainScreen />
  ))
  .add('with chrome', () => (
      <Chrome>
        <MainScreen />
      </Chrome>
  ))