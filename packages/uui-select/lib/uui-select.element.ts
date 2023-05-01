import { FormControlMixin } from '@umbraco-ui/uui-base/lib/mixins';
import { repeat } from 'lit/directives/repeat.js';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { css, html, LitElement } from 'lit';
import {
  property,
  query,
  queryAll,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';

import { UUISelectEvent } from './UUISelectEvent';
import { UUISelectOptionElement } from './uui-select-option.element';
import { UUISelectStyles } from './uui-select.styles';

// TODO: Dont set a global interface, we should expose a 'local' interface.
declare global {
  interface Option {
    name: string;
    value: string;
    group?: string;
    selected?: boolean;
    disabled?: boolean;
    key?: string;
  }
}

/**
 * Custom element wrapping the native select element. Pass an array of options to it.
 * This is a formAssociated element, meaning it can participate in a native HTMLForm. A name:value pair will be submitted.
 * @element uui-select
 * @fires change - when the user changes value
 */
// TODO: Consider if this should use child items instead of an array.
@defineElement('uui-select')
export class UUISelectElement extends FormControlMixin(LitElement) {
  static styles = [
    UUISelectStyles,
    css`
      :host {
        position: relative;
        font-family: inherit;
      }

      :host([error]) .uui-select {
        border: 1px solid var(--uui-color-danger-standalone);
      }

      :host([error]) .uui-select[disabled] {
        border: 1px solid var(--uui-color-danger-standalone);
      }
    `,
  ];

  /**
   * Text with which component should be labeled
   * @type {string}
   * @attr
   */
  @property({ type: String })
  public label!: string;

  /**
   * Defines the select's placeholder.
   * @type {string}
   * @attr
   */
  @property()
  placeholder = '';

  /**
   * Disables the select.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Set to true if the component should have an error state.Property is reflected to the corresponding attribute.
   * @type {boolean}
   * @attr
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * An array of options to be rendered by the element. If you want the element The option interface has up to 5 properties:
   * `interface Option {
    name: string;
    value: string;
    group?: string;
    selected?: boolean;
    disabled?: boolean;
  }`
   */
  @property({ type: Array, attribute: false })
  options: Option[] = [];

  @state()
  private _groups: string[] = [];

  /**
   * An array of options to be rendered by the element. Put the names of the groups you wanna disable, separated by a coma: `disabledGroups='fruits, vegetables'`. It's not case sensitive
   */
  @property()
  disabledGroups = '';

  @state()
  private _disabledGroups: string[] = [];

  private _values: string[] = [];

  @query('#native')
  protected _input!: HTMLSelectElement;

  @queryAll('option')
  protected _nativeOptionElements!: NodeListOf<HTMLOptionElement>;

  @queryAssignedElements({ selector: 'uui-select-option' })
  protected _optionElements!: UUISelectOptionElement[];

  constructor() {
    super();

    this.addEventListener('mousedown', () => {
      this.style.setProperty('--uui-show-focus-outline', '0');
    });
    this.addEventListener('blur', () => {
      this.style.setProperty('--uui-show-focus-outline', '');
    });

    this.addEventListener(
      UUISelectEvent.OPTION_CHANGE,
      this._handleOptionChange
    );
  }

  /**
   * This method enables <label for="..."> to focus the select
   */
  focus() {
    this._input.focus();
  }
  /**
   * This method enables <label for="..."> to open the select
   */
  click() {
    this._input.click();
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.label) {
      console.warn(this.tagName + ' needs a `label`', this);
    }
  }

  private _createDisabledGroups() {
    if (this.disabledGroups.length === 0) return;
    this._disabledGroups = this.disabledGroups.split(',');
  }

  private _extractGroups() {
    if (this.options.length === 0) return;

    this._groups = Array.from(
      new Set(
        this.options
          .filter(option => option.group)
          .map(option => option.group as string)
      )
    );
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('options')) {
      this._extractGroups();
      this._values = this.options.map(option => option.value);
      const selected = this.options.find(option => option.selected);
      this.value = selected ? selected.value : '';
    }

    if (changedProperties.has('value')) {
      this.value = this._values.includes(this.value as string)
        ? this.value
        : '';
    }
    if (changedProperties.has('disabledGroups')) this._createDisabledGroups();
  }

  protected setValue(e: Event) {
    e.stopPropagation();
    const target = e.target as HTMLSelectElement;
    if (e.target) this.value = target.value;
    console.log('set value', target.value, this.value);
    this.dispatchEvent(
      new UUISelectEvent(UUISelectEvent.CHANGE, {
        bubbles: true,
        composed: false,
      })
    );
  }

  protected getFormElement(): HTMLElement {
    return this._input;
  }

  private _handleSlotChange(event: Event) {
    this.options = this._optionElements.map((option: Option) => {
      return {
        name: option.name,
        value: option.value,
        group: option.group,
        selected: option.selected,
        disabled: option.disabled,
        key: option?.key,
      };
    });
    console.log('slot change', event);
  }

  private _handleOptionChange(event: Event) {
    event.stopPropagation();
    const target = event.target as UUISelectOptionElement;
    console.log('option change', target);
    // const optionElement = Array.from(this._nativeOptionElements).find(
    //   (option: HTMLOptionElement) => option.id === `option-${target.key}`
    // )

    // this.options = this.options.map(option => {
    //   if(option.key === target.key) {
    //     return {
    //       name: target.name === option.name ? option.name : target.name,
    //       value: target.value === option.value ? option.value : target.value,
    //       group: target.group === option.group ? option.group : target.group,
    //       selected: target.selected === option.selected ? option.selected : target.selected,
    //       disabled: target.disabled === option.disabled ? option.disabled : target.disabled,
    //       key: target.key === option.key ? option.key : target.key,
    //     }
    //   }
    //   return option;
    // });
  }

  private _renderOption(
    name: string,
    value: string,
    selected: boolean | undefined,
    disabled: boolean | undefined,
    id: string | undefined
  ) {
    return html`<option
      id="option-${id}"
      value="${value}"
      ?selected=${selected}
      ?disabled=${disabled}>
      ${name}
    </option>`;
  }

  private _renderGrouped() {
    if (this._groups.length === 0) return html``;

    return html`
      ${this._groups.map(
        group => html`<optgroup
          label=${group}
          ?disabled=${this._disabledGroups.some(
            disabled => disabled.toLowerCase() === group.toLowerCase()
          )}>
          ${this._renderOptions(option => option.group === group)}
        </optgroup>`
      )}
    `;
  }

  private _renderOptions(optionFilter: (option: Option) => boolean) {
    return html`
      ${repeat(
        this.options.filter(optionFilter),
        option => option.key,
        option =>
          this._renderOption(
            option.name,
            option.value,
            option.selected,
            option.disabled,
            option.key
          )
      )}
    `;
  }

  render() {
    return html` <select
        id="native"
        class="uui-select"
        aria-label=${this.label}
        @change=${this.setValue}
        ?disabled=${this.disabled}
        .name=${this.name}
        .value=${this.value as string}>
        <option disabled selected value="" hidden>${this.placeholder}</option>
        ${this._renderGrouped()} ${this._renderOptions(option => !option.group)}
      </select>
      <slot @slotchange=${this._handleSlotChange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-select': UUISelectElement;
  }
}
