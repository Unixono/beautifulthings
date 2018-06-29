import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/react';

import SettingsModal from './';

const stories = storiesOf('SettingsModal', module);
stories.addDecorator(withKnobs);

stories.add('SettingsModal', () => {
  return <SettingsModal
    visible={boolean('Visible?', true, '')}
    username={text('Username', 'username')}
    onHide={action('Hide pressed')}
    daily={true}
    onSignOut={action('SignOut pressed')}
  />
});
