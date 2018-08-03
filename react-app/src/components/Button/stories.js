import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';

import Button from './';

const stories = storiesOf('Button', module);
stories.addDecorator(withKnobs);

stories.add('Normal text button', () => (
  <Button
    disabled={boolean('Disabled', false)}
    onClick={action('Button clicked')}
  >
    Text
  </Button>
));

stories.add('Small text button', () => (
  <Button
    disabled={boolean('Disabled', false)}
    onClick={action('Button clicked')}
    small={true}
  >
    Text
  </Button>
));
