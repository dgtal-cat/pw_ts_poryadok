import { Locator } from '@playwright/test'
import BaseElement from '../../BaseElement'
import CatalogItemLvl_2 from './CatalogItemLvl_2'

export default class CatalogItemLvl_1 extends BaseElement {
	private itemLocator = 'a[contains(@class, "prk-top-menu__item-title lvl-2")]/parent::li'

	constructor(locator: Locator) {
		super(locator)
	}

	firstItem() {
		return new CatalogItemLvl_2(this.el.locator(`xpath=//${this.itemLocator}`).first())
	}

	byId(id: number) {
		return new CatalogItemLvl_2(this.el.locator(`xpath=//${this.itemLocator}`).nth(id - 1))
	}

	byName(name: string) {
		return new CatalogItemLvl_2(this.el.locator(`xpath=//a[text()="${name}"]/parent::li`))
	}
}
