import { Locator } from '@playwright/test'
import BaseElement from '../BaseElement'
import Button from '../_common/Button'

export default class ProductItem extends BaseElement {
	readonly titleElement: Locator
	readonly addButton: Button

	constructor(locator: Locator) {
		super(locator)
		this.titleElement = this.el.locator('xpath=//a[@class="product-tile__title"]/span')
		this.addButton = new Button(this.el.locator('//button[contains(@class, "add-to-cart-btn")]'))
	}
}
