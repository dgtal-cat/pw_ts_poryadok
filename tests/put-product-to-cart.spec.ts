import { test, expect, BrowserContext, Page } from '@playwright/test'
import MainPage from '../src/pages/MainPage'
import CheckoutPage from '../src/pages/CheckoutPage'
import CatalogPage from '../src/pages/CatalogPage'

test.describe('Add/delete products to/from cart', async () => {
	let context: BrowserContext
	let page: Page
	let mainPage: MainPage
	let checkoutPage: CheckoutPage
	let catalogPage: CatalogPage

	test.beforeEach(async ({ browser }) => {
		context = await browser.newContext()
		page = await context.newPage()
		mainPage = new MainPage(page)
		checkoutPage = new CheckoutPage(page)
		catalogPage = new CatalogPage(page)

		await mainPage.open()
	})

	test('Check empty cart checkout page', async () => {
		await checkoutPage.open()

		await expect(checkoutPage.page.locator('xpath=//div[@class="bx-soa-empty-cart-image"]')).toBeVisible()
		await expect(checkoutPage.page.locator('xpath=//div[@class="bx-soa-empty-cart-text"]')).toBeVisible()
		await expect(checkoutPage.page.locator('xpath=//div[@class="bx-soa-empty-cart-text"]')).toHaveText(
			'Ваша корзина пуста'
		)
	})

	test('Check add product to cart', async () => {
		const productTitle = await mainPage.saleProductList.firstItem().titleElement.textContent()
		await mainPage.saleProductList.firstItem().addButton.click()
		await checkoutPage.open()

		expect(await checkoutPage.checkoutProductList.firstItem().titleElement.textContent()).toEqual(productTitle)
	})

	test('Check add few different products to cart', async () => {
		const catalog = mainPage.headerBlock.topMenu.catalogDropdown

		await catalog.click()
		await catalog.byName(' Посуда ').hover()
		await catalog.catalogItemLvl_2.byName(' Кофемолки ручные ').click()
		const productTitle1 = await catalogPage.productList.byId(1).titleElement.textContent()
		await catalogPage.productList.byId(1).addButton.click()
		const productTitle2 = await catalogPage.productList.byId(2).titleElement.textContent()
		await catalogPage.productList.byId(2).addButton.click()

		await checkoutPage.open()

		const productTitleInCart_1 = await checkoutPage.checkoutProductList.byId(1).titleElement.textContent()
		const productTitleInCart_2 = await checkoutPage.checkoutProductList.byId(2).titleElement.textContent()

		expect(productTitleInCart_1).toEqual(productTitle1)
		expect(productTitleInCart_2).toEqual(productTitle2)
	})

	test('Check delete product from cart', async () => {
		const catalog = mainPage.headerBlock.topMenu.catalogDropdown

		await catalog.click()
		await catalog.byName(' Посуда ').hover()
		await catalog.catalogItemLvl_2.byName(' Кофемолки ручные ').click()
		const productTitle1 = await catalogPage.productList.byId(1).titleElement.textContent()
		await catalogPage.productList.byId(1).addButton.click()

		await checkoutPage.open()

		const productTitleInCart_1 = await checkoutPage.checkoutProductList.byId(1).titleElement.textContent()

		expect(productTitleInCart_1).toEqual(productTitle1)

		await checkoutPage.checkoutProductList.byId(1).deleteButton.click()

		await expect(checkoutPage.deleteProductDialog.el).toBeVisible()
		expect(await checkoutPage.deleteProductDialog.titleElement.textContent()).toEqual('Подтверждение')
		expect(await checkoutPage.deleteProductDialog.contentElement.textContent()).toEqual(
			'Вы точно хотите удалить выбранный товар? Это действие будет невозможно отменить'
		)

		await checkoutPage.deleteProductDialog.deleteButton.click()

		await expect(checkoutPage.page.locator('xpath=//div[@class="bx-soa-empty-cart-image"]')).toBeVisible()
		await expect(checkoutPage.page.locator('xpath=//div[@class="bx-soa-empty-cart-text"]')).toBeVisible()
		await expect(checkoutPage.page.locator('xpath=//div[@class="bx-soa-empty-cart-text"]')).toHaveText(
			'Ваша корзина пуста'
		)
	})

	test('Check delete few products from cart', async () => {
		const catalog = mainPage.headerBlock.topMenu.catalogDropdown

		await catalog.click()
		await catalog.byName(' Посуда ').hover()
		await catalog.catalogItemLvl_2.byName(' Кофемолки ручные ').click()
		const productTitle1 = await catalogPage.productList.byId(1).titleElement.textContent()
		await catalogPage.productList.byId(1).addButton.click()
		const productTitle2 = await catalogPage.productList.byId(2).titleElement.textContent()
		await catalogPage.productList.byId(2).addButton.click()

		await checkoutPage.open()

		const productTitleInCart_1 = await checkoutPage.checkoutProductList.byId(1).titleElement.textContent()
		const productTitleInCart_2 = await checkoutPage.checkoutProductList.byId(2).titleElement.textContent()

		expect(productTitleInCart_1).toEqual(productTitle1)
		expect(productTitleInCart_2).toEqual(productTitle2)

		await checkoutPage.checkoutProductList.byId(2).deleteButton.click()

		await expect(checkoutPage.deleteProductDialog.el).toBeVisible()
		expect(await checkoutPage.deleteProductDialog.titleElement.textContent()).toEqual('Подтверждение')
		expect(await checkoutPage.deleteProductDialog.contentElement.textContent()).toEqual(
			'Вы точно хотите удалить выбранный товар? Это действие будет невозможно отменить'
		)

		await checkoutPage.deleteProductDialog.deleteButton.click()
		
		await expect(checkoutPage.deleteProductDialog.el).not.toBeVisible()

		await checkoutPage.checkoutProductList.byId(1).deleteButton.click()

		await expect(checkoutPage.deleteProductDialog.el).toBeVisible()
		expect(await checkoutPage.deleteProductDialog.titleElement.textContent()).toEqual('Подтверждение')
		expect(await checkoutPage.deleteProductDialog.contentElement.textContent()).toEqual(
			'Вы точно хотите удалить выбранный товар? Это действие будет невозможно отменить'
		)

		await checkoutPage.deleteProductDialog.deleteButton.click()
	})

	test('Check cart button badge when add/delete product', async () => {
		const catalog = mainPage.headerBlock.topMenu.catalogDropdown

		await expect(mainPage.headerBlock.cartButton.badgeElement).not.toBeVisible()

		await catalog.click()
		await catalog.byName(' Посуда ').hover()
		await catalog.catalogItemLvl_2.byName(' Кофемолки ручные ').click()
		await catalogPage.productList.firstItem().addButton.click()

		await expect(mainPage.headerBlock.cartButton.badgeElement).toBeVisible()
		expect(await mainPage.headerBlock.cartButton.badgeElement.textContent()).toEqual('1')

		await checkoutPage.open()

		await expect(checkoutPage.checkoutProductList.firstItem().el).toBeVisible()

		await checkoutPage.checkoutProductList.firstItem().deleteButton.click()
		await checkoutPage.deleteProductDialog.deleteButton.click()

		await checkoutPage.page.waitForTimeout(500)
		await checkoutPage.page.reload()
		await expect(mainPage.headerBlock.cartButton.badgeElement).not.toBeVisible()
	})

	test('Check change product quantity in cart', async () => {
		const productTitle = await mainPage.saleProductList.firstItem().titleElement.textContent()
		const checkoutItem = checkoutPage.checkoutProductList.firstItem()

		await mainPage.saleProductList.firstItem().addButton.click()
		await checkoutPage.open()

		expect(await checkoutItem.titleElement.textContent()).toEqual(productTitle)
		expect(await checkoutItem.getQuantityValue()).toEqual('1')

		await checkoutItem.increaseQuantityBy(3)
		await checkoutPage.page.waitForTimeout(500)

		expect(await checkoutItem.getQuantityValue()).toEqual('4')

		await checkoutItem.decreaseQuantityBy(2)
		await checkoutPage.page.waitForTimeout(500)

		expect(await checkoutItem.getQuantityValue()).toEqual('2')
	})
})

test.describe('Calculation of the price of the products', async () => {
	let context: BrowserContext
	let page: Page
	let mainPage: MainPage
	let checkoutPage: CheckoutPage

	test.beforeEach(async ({ browser }) => {
		context = await browser.newContext()
		page = await context.newPage()
		mainPage = new MainPage(page)
		checkoutPage = new CheckoutPage(page)

		await mainPage.open()
	})

	test.skip('Check price match in catalog and in cart', async () => {})

	test.skip('Check price match in product page and in cart', async () => {})

	test.skip('Check total price when change product quantity', async () => {})

	test.skip('Check total price for few products', async () => {})

	test.skip('Check total price when change quantity for few products', async () => {})
})
