import './uui-select-option.element';
import '.';

import { StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const options: Array<Option> = [
  { name: 'Carrot', value: 'orange' },
  { name: 'Cucumber', value: 'green' },
  { name: 'Aubergine', value: 'purple' },
  { name: 'Blueberry', value: 'Blue' },
  { name: 'Banana', value: 'yellow' },
  { name: 'Strawberry', value: 'red' },
];

const preselectedOptions: Array<Option> = options.map(option => {
  if (option.name === 'Aubergine') return { ...option, selected: true };
  return option;
});

const groupedOptions: Array<Option> = options.map(option => {
  if (options.indexOf(option) <= 2) return { ...option, group: 'Vegetables' };
  return { ...option, group: 'Fruits' };
});

export default {
  id: 'uui-select',
  title: 'Inputs/Select',
  component: 'uui-select',
  args: {
    label: 'Favorite green',
    placeholder: 'Select an option',
    disabled: false,
    error: false,
    name: 'Favorite Green',
    value: '',
  },
  parameters: {
    docs: {
      source: {
        code: `
<uui-select placeholder="Select an option"></uui-select>

//this is an example of array you need to pass to the select component to print the options
const options: Array<Option> = [
  { name: 'Carrot', value: 'orange' },
  { name: 'Cucumber', value: 'green' },
  { name: 'Aubergine', value: 'purple' },
  { name: 'Blueberry', value: 'Blue' },
  { name: 'Banana', value: 'yellow' },
  { name: 'Strawberry', value: 'red' },
];

`,
      },
    },
  },
};

export const AAAOverview: StoryObj = {
  render: props =>
    html`<uui-select
      .options=${options}
      .placeholder=${props.placeholder}
      .disabled=${props.disabled}
      .label=${props.label}
      ?error=${props.error}></uui-select>`,

  name: 'Overview',
};

export const Preselected: StoryObj = {
  render: () =>
    html`<uui-select
      .options=${preselectedOptions}
      label="Preselected"></uui-select>`,

  parameters: {
    docs: {
      source: {
        code: `
  <uui-select placeholder="Select an option"></uui-select>

  //this is an example of array you need to pass to the select component to print the options
  const options: Array<Option> = [
  { name: 'Carrot', value: 'orange' },
  { name: 'Cucumber', value: 'green' },
  { name: 'Aubergine', value: 'purple', selected: true },
  { name: 'Blueberry', value: 'Blue' },
  { name: 'Banana', value: 'yellow' },
  { name: 'Strawberry', value: 'red' },
  ];

  `,
      },
    },
  },
};

export const Groups: StoryObj = {
  render: props =>
    html`<uui-select
      .options=${groupedOptions}
      label="Grouped"
      .placeholder=${props.placeholder}></uui-select>`,

  parameters: {
    controls: { include: ['placeholder'] },
    docs: {
      source: {
        code: `
  <uui-select placeholder="Select an option"></uui-select>

  //this is an example of array you need to pass to the select component to print the options
  const options: Array<Option> = [
  { name: 'Carrot', value: 'orange', group: 'Vegetables' },
  { name: 'Cucumber', value: 'green', group: 'Vegetables' },
  { name: 'Aubergine', value: 'purple',, group: 'Vegetables' },
  { name: 'Blueberry', value: 'Blue', group: 'Fruits' },
  { name: 'Banana', value: 'yellow', group: 'Fruits' },
  { name: 'Strawberry', value: 'red', group: 'Fruits' },
  ];

  `,
      },
    },
  },
};

export const DisabledGroups: StoryObj = {
  render: props =>
    html`<uui-select
      .options=${groupedOptions}
      label="Disabled Group"
      disabledGroups="vegetables"
      .placeholder=${props.placeholder}></uui-select>`,

  parameters: {
    controls: { include: ['placeholder'] },
    docs: {
      source: {
        code: `
  <uui-select disabledGroups="vegetables"></uui-select>`,
      },
    },
  },
};

export const Disabled: StoryObj = {
  render: props =>
    html`<uui-select
      .options=${options}
      label="Label"
      .placeholder=${props.placeholder}
      .disabled=${props.disabled}></uui-select> `,

  args: {
    disabled: true,
  },

  parameters: {
    controls: { include: ['disabled'] },
    docs: {
      source: {
        code: `
  <uui-select disabled></uui-select>`,
      },
    },
  },
};

export const Error: StoryObj = {
  render: props =>
    html`<uui-select
      .options=${options}
      label="Label"
      .placeholder=${props.placeholder}
      ?error=${props.error}></uui-select>`,

  args: {
    error: true,
  },

  parameters: {
    controls: { include: ['error'] },
    docs: {
      source: {
        code: `
  <uui-select error></uui-select>`,
      },
    },
  },
};
