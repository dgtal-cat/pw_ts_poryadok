import { Locator } from '@playwright/test'
import BaseElement from '../BaseElement'
import SaleProductItem from './SaleProductItem'

export default class SaleProductList extends BaseElement {
	constructor(locator: Locator) {
		super(locator)
	}

	firstItem() {
		return new SaleProductItem(this.el.locator('xpath=//div[contains(@class, "sale-product-list__item")]').first())
	}

	byId(id: number) {
		return new SaleProductItem(this.el.locator('xpath=//div[contains(@class, "sale-product-list__item")]').nth(id - 1))
	}

	byName(name: string) {
		return new SaleProductItem(
			this.el.locator(`xpath=//a[text()="${name}"]/ancestor::div[contains(@class, "sale-product-list__item")]`)
		)
	}
}
