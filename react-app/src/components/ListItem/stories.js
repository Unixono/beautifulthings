import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import ListItem from './';

const stories = storiesOf('ListItem', module);
stories.addDecorator(withKnobs);

stories.add('ListItem', () => (
  <ListItem
    id={0}
    date={'2018-01-01'}
    text={text('Text', 'Text to be shown')}
    onEdit={action('Edit clicked')}
    onDelete={action('Delete clicked')}
  />
));
