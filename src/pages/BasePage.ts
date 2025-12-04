import { Page } from '@playwright/test'
import TopMenu from '../elements/_common/HeaderBlock/TopMenu'
import HeaderBlock from '../elements/_common/HeaderBlock/HeaderBlock'

export default class BasePage {
	readonly page: Page
	readonly headerBlock: HeaderBlock

	constructor(page: Page) {
		this.page = page
		this.headerBlock = new HeaderBlock(this.page.locator('div#header'))
	}

	async open(url: string): Promise<void> {
		await this.page.goto(url)
	}
}
