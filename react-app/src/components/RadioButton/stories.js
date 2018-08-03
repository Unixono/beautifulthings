import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';

import RadioButton from './';

const stories = storiesOf('RadioButton', module);
stories.addDecorator(withKnobs);

stories.add('RadioButton', () => {
  return <RadioButton
    label={text('Label: ', 'Daily')}
    selected={boolean('Selected: ', false)}
    onClick={action('Input clicked')}
  />
});
