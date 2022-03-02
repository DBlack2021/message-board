import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Message from '../components/atoms/Message/Message';

export default {
  title: 'Components/Message',
  decorators: [withKnobs],
}

export const Default = () => (
  <Message name={text("Name", "Gerald")} messageContent={text("Message", "Poop")}/>
);