import { html } from 'lit-html';
import './index';

export default {
  title: 'Basics/Radio Group',
  component: 'uui-radio-group',
};

export const Overview = () =>
  html`
    <uui-radio-group>
      <uui-radio value="Value 1">Option 1</uui-radio>
      <uui-radio value="Value 2" label="Option 2"></uui-radio>
      <uui-radio value="Value 3">Option 3</uui-radio>
      <uui-radio value="Value 3" disabled>Option 4</uui-radio>
    </uui-radio-group>
    <hr />
    <!-- <uui-radio-group>
      <uui-radio value="Value 1">Option 1</uui-radio>
      <uui-radio value="Value 2" label="Option 2"></uui-radio>
      <uui-radio value="Value 3">Option 3</uui-radio>
      <uui-radio value="Value 3" disabled>Option 4</uui-radio>
    </uui-radio-group> -->
  `;
