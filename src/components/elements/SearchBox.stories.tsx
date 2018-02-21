import * as React from "react";
import { storiesOf } from '@storybook/react';

import Chrome from '../Chrome';
import SearchBox from './SearchBox';

storiesOf('SearchBox', module)
  .add('with chrome', () => (
      <Chrome>
        <SearchBox 
          id={'search'}
          placeholder="Search the internet for butts"
        />
      </Chrome>
  ))
