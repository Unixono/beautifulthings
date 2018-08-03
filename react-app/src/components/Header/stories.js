import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';

import Header from './';
import ActionIcon from 'components/ActionIcon';

const stories = storiesOf('Header', module);
stories.addDecorator(withKnobs);

const backgroundStyle = {'background-color': 'black'};

stories.add('Header with no side icons', () => (
  <div style={backgroundStyle}>
    <Header whiteLogo={boolean('White logo', false)} />
  </div>
));

stories.add('Header with left icon', () => {
  const leftIcon = ActionIcon({
    icon: ActionIcon.SETTINGS,
    onClick: action('Settings clicked'),
  });

  return (
    <div style={backgroundStyle}>
      <Header
        left={leftIcon}
        whiteLogo={boolean('White logo', false)}
      />
    </div>
  );
});

stories.add('Header with left and right icons', () => {
  const leftIcon = ActionIcon({
    icon: ActionIcon.BACK,
    onClick: action('Back clicked'),
  });

  const rightIcon = ActionIcon({
    icon: ActionIcon.APPLY,
    onClick: action('Apply clicked'),
  });

  return (
    <div style={backgroundStyle}>
      <Header
        left={leftIcon}
        right={rightIcon}
        whiteLogo={boolean('White logo', false)}
      />
    </div>
  );
});
