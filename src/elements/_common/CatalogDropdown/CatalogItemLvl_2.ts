import { Locator } from '@playwright/test'
import BaseElement from '../../BaseElement'
import CatalogItemLvl_3 from './CatalogItemLvl_3'

export default class CatalogItemLvl_2 extends BaseElement {
	private itemLocator = 'a[contains(@class, "prk-top-menu__item-title lvl-3")]/parent::li'

	constructor(locator: Locator) {
		super(locator)
	}

	firstItem() {
		return new CatalogItemLvl_3(this.el.locator(`xpath=//${this.itemLocator}`).first())
	}

	byId(id: number) {
		return new CatalogItemLvl_3(this.el.locator(`xpath=//${this.itemLocator}`).nth(id - 1))
	}

	byName(name: string) {
		return new CatalogItemLvl_3(
			this.el.locator(`xpath=//span[text()="${name}"]/ancestor::li[@class="prk-top-menu__item lvl-3"]`)
		)
	}
}
