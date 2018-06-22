import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, selectV2 } from '@storybook/addon-knobs/react';

import SettingsOptionLabel from './';

const stories = storiesOf('SettingsOptionLabel', module);
stories.addDecorator(withKnobs);

const availableIcons = {
  notification: SettingsOptionLabel.NOTIFICATION,
  star: SettingsOptionLabel.STAR,
  share: SettingsOptionLabel.SHARE,
  signout: SettingsOptionLabel.SIGNOUT,
}

stories.add('SettingsOptionLabel without onClick function', () => {
  return <SettingsOptionLabel
    icon={selectV2('Icon', availableIcons, availableIcons.notification)}
    text={text('Text', 'Notifications')}
  />
});

stories.add('SettingsOptionLabel with onClick function', () => {
  return <SettingsOptionLabel
    icon={selectV2('Icon', availableIcons, availableIcons.notification)}
    text={text('Text', 'Notifications')}
    onClick={action('Item clicked')}
  />
});

stories.add('SettingsOptionLabel with children', () => {
  return (<SettingsOptionLabel
    icon={selectV2('Icon', availableIcons, availableIcons.notification)}
    text={text('Text', 'Notifications')}>
      <span>
        Children goes here
      </span>
    </SettingsOptionLabel>
  )
});
