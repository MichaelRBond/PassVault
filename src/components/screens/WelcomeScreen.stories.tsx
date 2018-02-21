import * as React from "react";
import { storiesOf } from '@storybook/react';

import Chrome from '../Chrome';
import WelcomeScreen from './WelcomeScreen';

storiesOf('WelcomeScreen', module)
  .add('base', () => (
    <WelcomeScreen />
  ))
  .add('with chrome', () => (
      <Chrome>
        <WelcomeScreen />
      </Chrome>
  ))
