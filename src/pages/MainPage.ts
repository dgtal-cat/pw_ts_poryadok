import { Page } from '@playwright/test'
import BasePage from './BasePage';
import SaleProductList from '../elements/MainPage/SaleProductList';

export default class MainPage extends BasePage{

	private url: string
	readonly saleProductList: SaleProductList

	constructor(page: Page) {
		super(page)
		this.url = 'https://poryadok.ru/'
		this.saleProductList = new SaleProductList(
			this.page.locator('xpath=//div[@class="sale-product-list sale-product-list--desktop"]')
		)
	}

	async open() {
		await super.open(this.url)
	}


}