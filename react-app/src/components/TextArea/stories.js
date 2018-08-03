import React from 'react';
import { storiesOf } from '@storybook/react';

import TextArea from './';

const stories = storiesOf('TextArea', module);

stories.add('TextArea', () => <TextArea text="Example text" />);
