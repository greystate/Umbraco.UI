import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { InterfaceColor, InterfaceLook } from 'packages/uui-base/lib/types';

/**
 * @element uui-notification-area
 * @slot the content
 */
@defineElement('uui-notification-area')
export class UUINotificationAreaElement extends LitElement {
  static styles = [
    css`
      :host {
        box-sizing: border-box;
        display: block;
        position: relative;
        display: block;
        width: 100%;
      }

      #area {
        position: relative;
        display: block;
        box-sizing: border-box;
        background-color: var(--uui-color-surface);
        padding: var(--uui-size-space-4) var(--uui-size-space-5);
        border-radius: var(--uui-border-radius);
        border: 1px solid transparent;
      }

      :host > #area {
        background-color: var(--uui-color-surface);
        color: var(--uui-color-text);
        border-color: var(--uui-color-border-standalone);
      }
      :host([color='default']) > #area {
        background-color: var(--uui-color-default);
        color: var(--uui-color-default-contrast);
        border-color: var(--uui-color-default-standalone);
      }
      :host([color='positive']) > #area {
        background-color: var(--uui-color-positive);
        color: var(--uui-color-positive-contrast);
        border-color: var(--uui-color-positive-standalone);
      }
      :host([color='warning']) > #area {
        background-color: var(--uui-color-warning);
        color: var(--uui-color-warning-contrast);
        border-color: var(--uui-color-warning-standalone);
      }
      :host([color='danger']) > #area {
        background-color: var(--uui-color-danger);
        color: var(--uui-color-danger-contrast);
        border-color: var(--uui-color-danger-standalone);
      }
    `,
  ];

  @property()
  look: InterfaceLook = 'default';

  @property()
  color: InterfaceColor = 'danger';

  render() {
    return html`
      <div id="area">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-notification-area': UUINotificationAreaElement;
  }
}
