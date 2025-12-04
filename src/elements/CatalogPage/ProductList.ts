import { Locator } from '@playwright/test'
import BaseElement from '../BaseElement'
import ProductItem from './ProductItem'

export default class ProductList extends BaseElement {
	constructor(locator: Locator) {
		super(locator)
	}

	firstItem() {
		return new ProductItem(this.el.locator('xpath=//div[contains(@class, "products-container-item")]').first())
	}

	byId(id: number) {
		return new ProductItem(this.el.locator('xpath=//div[contains(@class, "products-container-item")]').nth(id - 1))
	}

	byName(name: string) {
		return new ProductItem(
			this.el.locator(`xpath=//a[text()="${name}"]/ancestor::div[contains(@class, "products-container-item")]`)
		)
	}
}
