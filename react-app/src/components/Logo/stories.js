import React from 'react';
import { storiesOf } from '@storybook/react';

import Logo from './';

const stories = storiesOf('Logo', module);

stories.add('Logo', () => <Logo />);

stories.add('Logo white', () => (
  <div style={{'background-color': 'black'}}>
    <Logo white={true} />
  </div>
));
