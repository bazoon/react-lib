import React from 'react';
import Button from '../../button/Button';

export default {
  component: Button,
  namespace: 'buttons',
  name: 'button',
  props: {
    text: 'Lorem ipsum',
    disabled: true,
    onChange: value => console.log(`Select: ${value}`)
  }
};

