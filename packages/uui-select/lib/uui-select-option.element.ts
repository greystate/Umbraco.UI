import { LitElement, PropertyValueMap, css } from 'lit';
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

  @property({ type: String })
  key: string = self.crypto.randomUUID();

  /**
   * prevent firing the change event on first setter call
   *
   * @private
   * @memberof UUISelectOptionElement
   */
  private _init = false;

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    this._init = true;
  }

  protected willUpdate() {
    if (this._init)
      this.dispatchEvent(new UUISelectEvent(UUISelectEvent.OPTION_CHANGE));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-select-option': UUISelectOptionElement;
  }
}
