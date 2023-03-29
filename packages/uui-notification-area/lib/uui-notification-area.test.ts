import { html, fixture, expect } from '@open-wc/testing';
import { UUINotificationAreaElement } from './uui-notification-area.element';

describe('UUINotificationAreaElement', () => {
  let element: UUINotificationAreaElement;

  beforeEach(async () => {
    element = await fixture(
      html` <uui-notification-area></uui-notification-area> `
    );
  });

  it('is defined with its own instance', () => {
    expect(element).to.be.instanceOf(UUINotificationAreaElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
