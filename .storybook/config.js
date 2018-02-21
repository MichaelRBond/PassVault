import { configure } from '@storybook/react';

const req = require.context('../src/components', true, /\.stories\.tsx$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

import styles from '../src/styles/app.scss'

configure(loadStories, module);

