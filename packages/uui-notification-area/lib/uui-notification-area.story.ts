import '.';
import { Story } from '@storybook/web-components';
import { html } from 'lit';

export default {
  id: 'uui-notification-area',
  title: 'Displays/Notification Area',
  component: 'uui-notification-area',
};

const colors = ['', 'default', 'positive', 'warning', 'danger'];

export const AAAOverview: Story = props =>
  html` <uui-notification-area color="${props.color}">
    Notification Area
  </uui-notification-area>`;
AAAOverview.storyName = 'Overview';

AAAOverview.argTypes = {
  color: {
    control: {
      type: 'select',
      options: colors,
    },
  },
};

export const Colors: Story = () =>
  html`<div style="display:flex; flex-direction:column; gap: 20px;">
    ${colors.map(color => {
      return html`<uui-notification-area color="${color}">
        ${color
          ? html`Notification Area with color="${color}"`
          : 'Notification Area with no color value'}
      </uui-notification-area>`;
    })}
  </div>`;
