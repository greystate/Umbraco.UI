import { LitElement, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { UUISelectEvent } from './UUISelectEvent';

@customElement('uui-select-option')
export class UUISelectOptionElement extends LitElement implements Option {
  static styles = [
    css`
      :host {
        display: none;
      }
    `,
  ];

  @property({ type: String })
  name = '';

  @property({ type: String })
  value = '';

  @property({ type: Boolean })
  selected?: boolean | undefined;

  @property({ type: Boolean })
  disabled?: boolean | undefined;

  @property({ type: String })
  group?: string | undefined;

  protected willUpdate() {
    this.dispatchEvent(new UUISelectEvent(UUISelectEvent.OPTION_CHANGE));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-select-option': UUISelectOptionElement;
  }
}
