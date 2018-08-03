import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import SettingsModal from './';

const stories = storiesOf('SettingsModal', module);
stories.addDecorator(withKnobs);

const _setModalRef = element => element.show(true);

stories.add('SettingsModal', () => {
  return <SettingsModal
    username={text('Username', 'username')}
    onHide={action('Hide pressed')}
    onSignOut={action('SignOut pressed')}
    ref={_setModalRef}
  />
});
