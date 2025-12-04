import { Locator } from '@playwright/test'

export default class BaseElement {
	readonly el: Locator

	constructor(locator: Locator) {
		this.el = locator
	}

	async click() {
		await this.el.click()
	}

	async hover() {
		await this.el.hover()
	}
}