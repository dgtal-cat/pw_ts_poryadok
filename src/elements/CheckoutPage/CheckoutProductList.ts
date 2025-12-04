import { Locator } from '@playwright/test'
import BaseElement from '../BaseElement'
import CheckoutProductItem from './CheckoutProductItem'

export default class CheckoutProductList extends BaseElement {
	constructor(locator: Locator) {
		super(locator)
	}

	firstItem() {
		return new CheckoutProductItem(this.el.locator('xpath=//app-checkout-cart-product').first())
	}

	byId(id: number) {
		return new CheckoutProductItem(this.el.locator('xpath=//app-checkout-cart-product').nth(id - 1))
	}

	byName(name: string) {
		return new CheckoutProductItem(this.el.locator(`xpath=//a[text()="${name}"]/ancestor::app-checkout-cart-product`))
	}
}
