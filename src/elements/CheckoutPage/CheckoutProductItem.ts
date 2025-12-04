import { Locator } from '@playwright/test'
import BaseElement from '../BaseElement'
import Button from '../_common/Button'

export default class CheckoutProductItem extends BaseElement {
	readonly titleElement: Locator
	readonly finalPriceElement: Locator
	readonly addToFavoriteButton: Button
	readonly deleteButton: Button
	readonly quantityIncreaseButton: Button
	readonly quantityDecreaseButton: Button
	readonly quantityValueInput: Locator

	constructor(locator: Locator) {
		super(locator)
		this.titleElement = this.el.locator('xpath=//a[@class="checkout-cart-product__name"]')
		this.finalPriceElement = this.el.locator(
			'xpath=//span[contains(@class, "checkout-cart-product-pricing__price--actual")]'
		)
		this.addToFavoriteButton = new Button(
			this.el.locator('xpath=//button[contains(@class, "checkout-cart-product__add-to-fav-btn")]')
		)
		this.deleteButton = new Button(
			this.el.locator('xpath=//button[contains(@class, "checkout-cart-product__remove-btn")]')
		)
		this.quantityIncreaseButton = new Button(
			this.el.locator('xpath=//button[contains(@class, "cart-quantity__btn--increase")]')
		)
		this.quantityDecreaseButton = new Button(
			this.el.locator('xpath=//button[contains(@class, "cart-quantity__btn--decrease")]')
		)
		this.quantityValueInput = this.el.locator('xpath=//input[@class="cart-quantity__input"]')
	}

	async getQuantityValue() {
		return await this.quantityValueInput.inputValue()
	}

	async increaseQuantityBy(count: number) {
		for (let i = 0; i < count; i++) {
			await this.quantityIncreaseButton.click()
		}
	}

	async decreaseQuantityBy(count: number) {
		for (let i = 0; i < count; i++) {
			await this.quantityDecreaseButton.click()
		}
	}
}
