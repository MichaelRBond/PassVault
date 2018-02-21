import * as React from "react";
import { storiesOf } from '@storybook/react';
import Checkbox from './Checkbox';

storiesOf('Checkbox', module)
  .add('with text', () => (
    <Checkbox
      id="foo-checkbox"
      checked={true}
      label="Test Checkbox"
      onChangeHandler={(checked: any): void => {
        console.info("checkbox changed!", checked);
    }}
    />
  ))

