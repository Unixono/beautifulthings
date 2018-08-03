import React from 'react';
import { storiesOf } from '@storybook/react';

import Welcome from './';

const stories = storiesOf('Welcome', module);

const containerStyle = {
  height: '100vh',
  width: '100vw',
}

stories.add('Welcome', () => (
  <div style={containerStyle}>
    <Welcome />
  </div>
));
