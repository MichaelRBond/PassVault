import * as React from "react";
import { storiesOf } from '@storybook/react';
import PassVault from './PassVault';

storiesOf('PassVault', module)
  .add('full', () => (
    <div style={{width: '350px', height: '520px'}}>
      <PassVault />
    </div>
  ))

