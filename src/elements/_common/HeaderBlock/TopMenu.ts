import { Locator } from '@playwright/test'
import BaseElement from '../../BaseElement'
import CatalogDropdown from '../CatalogDropdown/CatalogDropdown'

export default class TopMenu extends BaseElement {
	readonly catalogDropdown: CatalogDropdown

	constructor(locator: Locator) {
		super(locator)
		this.catalogDropdown = new CatalogDropdown(
			this.el.locator('xpath=//li[contains(@class, "js-dropdown prk-top-menu__item")]')
		)
	}
}
