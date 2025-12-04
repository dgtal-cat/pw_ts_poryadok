import { Locator } from '@playwright/test';
import BaseElement from '../BaseElement';

export default class Button extends BaseElement {
	constructor(locator: Locator) {
		super(locator)
	}

	async click() {
		await this.el.click()
	}
}