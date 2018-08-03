import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import ErrorModal from './';

const stories = storiesOf('ErrorModal', module);
stories.addDecorator(withKnobs);

stories.add('ErrorModal', () =>
  <ErrorModal
    message={text('Message', 'Error')}
    onClose={action('Button clicked')}
  />
);
