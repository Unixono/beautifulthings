import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import ListItem from './';

const stories = storiesOf('ListItem', module);
stories.addDecorator(withKnobs);

stories.add('ListItem', () => (
  <ListItem
    date={'2018-01-01'}
    text={text('Text', 'Today I crossed a beautiful dog very similar to Bobby, my childhood pet.')}
    onEdit={action('Edit clicked')}
    onDelete={action('Delete clicked')}
  />
));
