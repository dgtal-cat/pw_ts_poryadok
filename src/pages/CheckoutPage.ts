import { Page } from '@playwright/test'
import BasePage from './BasePage'
import CheckoutProductList from '../elements/CheckoutPage/CheckoutProductList'
import DeleteProductDialog from '../elements/CheckoutPage/DeleteProductDialog'

export default class CheckoutPage extends BasePage {
	private url: string
	readonly checkoutProductList: CheckoutProductList
	readonly deleteProductDialog: DeleteProductDialog

	constructor(page: Page) {
		super(page)
		this.url = 'https://poryadok.ru/personal/checkout/'
		this.checkoutProductList = new CheckoutProductList(
			this.page.locator('xpath=//section[@class="checkout-cart checkout-cart--desktop"]')
		)
		this.deleteProductDialog = new DeleteProductDialog(this.page.locator('app-confirmation-dialog'))
	}

	async open() {
		await super.open(this.url)
	}
}
