import { Page } from '@playwright/test'
import ProductList from '../elements/CatalogPage/ProductList'
import BasePage from './BasePage'

export default class CatalogPage extends BasePage {
	productList: ProductList

	constructor(page: Page) {
		super(page)
		this.productList = new ProductList(this.page.locator('//div[contains(@class, "product-container--tiles")]'))
	}
}
