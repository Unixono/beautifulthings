import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';

import ButtonsModal from './';
import Button from 'components/Button';

const stories = storiesOf('ButtonsModal', module);
stories.addDecorator(withKnobs);

const primaryButton = Button({
  children: "Primary button",
  onClick: action('Primary button clicked'),
  small: true,
});

const secondaryButton = Button({
  children: "Secondary button",
  onClick: action('Secondary button clicked'),
  small: true,
});

stories.add('ButtonsModal with unique button', () => (
  <ButtonsModal
    visible={boolean('Visible?', true, '')}
    message={text('Message', 'This is the message that will be shown')}
    primaryButton={primaryButton}
  />
));

stories.add('ButtonsModal with secondary button', () => (
  <ButtonsModal
    visible={boolean('Visible?', true, '')}
    message={text('Message', 'This is the message that will be shown')}
    primaryButton={primaryButton}
    secondaryButton={secondaryButton}
  />
));
