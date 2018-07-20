import React from 'react';
import { storiesOf } from '@storybook/react';

import Welcome from './';

const stories = storiesOf('Welcome', module);

stories.add('Welcome', () => <Welcome />);
