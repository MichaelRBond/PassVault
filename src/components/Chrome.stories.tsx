import * as React from "react";
import { storiesOf } from '@storybook/react';
import Chrome from './Chrome';

storiesOf('Chrome', module)
  .add('full', () => (
      <Chrome />
  ))
  .add('with child', () => (
      <Chrome>
        <h1>Here is some content</h1>
      </Chrome>
  ))

