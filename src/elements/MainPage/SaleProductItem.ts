import { Locator } from '@playwright/test'
import BaseElement from '../BaseElement'
import Button from '../_common/Button'

export default class SaleProductItem extends BaseElement {
	readonly titleElement: Locator
	readonly addButton: Button

	constructor(locator: Locator) {
		super(locator)
		this.titleElement = this.el.locator('xpath=//a[@class="c-product__title"]')
		this.addButton = new Button(this.el.locator('xpath=//button[@title="В корзину"]'))
	}
}
