import { css } from 'lit';
/**
 * You can override the native styles of the select element by using this `css` tagged template literal and add `class="uui-select" to any native `<select>` element`.
 */
export const UUISelectStyles = css`
  .uui-select {
    display: inline-block;
    font-family: inherit;
    font-size: var(--uui-select-font-size, var(--uui-size-5));
    height: var(--uui-select-height, var(--uui-size-11));
    width: 100%;
    padding: var(--uui-select-padding-y, var(--uui-size-1))
      var(--uui-select-padding-x, var(--uui-size-2));
    color: currentColor;
    border-radius: 0;
    box-sizing: border-box;
    background-color: transparent;
    border: 1px solid var(--uui-select-border-color, var(--uui-color-border));
    transition: all 150ms ease;
  }

  .uui-select:focus {
    outline: calc(2px * var(--uui-show-focus-outline, 1)) solid
      var(--uui-color-focus);
  }

  .uui-select[disabled] {
    cursor: not-allowed;
    background-color: var(
      --uui-select-disabled-background-color,
      var(--uui-color-disabled)
    );
  }

  .uui-select:hover {
    border: 1px solid
      var(--uui-select-border-color-hover, var(--uui-color-border-emphasis));
  }

  .uui-select option:checked {
    background: var(
      --uui-select-selected-option-background-color,
      var(--uui-color-selected)
    );
    color: var(
      --uui-select-selected-option-color,
      var(--uui-color-selected-contrast)
    );
  }

  /* TODO: a proper focus style has to be implemented. it needs it's own variables */
  .uui-select:focus {
    outline-color: var(--uui-select-outline-color, var(--uui-color-focus));
  }
`;
