import { Locator } from '@playwright/test'
import BaseElement from '../../BaseElement'
import CatalogItemLvl_1 from './CatalogItemLvl_1'
import CatalogItemLvl_2 from './CatalogItemLvl_2'
import CatalogItemLvl_3 from './CatalogItemLvl_3'

export default class CatalogDropdown extends BaseElement {
	readonly catalogItemLvl_2: CatalogItemLvl_2
	readonly catalogItemLvl_3: CatalogItemLvl_3

	private itemLocator = 'a[contains(@class, "prk-top-menu__item-title lvl-1")]/parent::li'

	constructor(locator: Locator) {
		super(locator)
		this.catalogItemLvl_2 = new CatalogItemLvl_2(this.el)
		this.catalogItemLvl_3 = new CatalogItemLvl_3(this.el)
	}

	firstItem() {
		return new CatalogItemLvl_1(this.el.locator(`xpath=//${this.itemLocator}`).first())
	}

	byId(id: number) {
		return new CatalogItemLvl_1(this.el.locator(`xpath=//${this.itemLocator}`).nth(id - 1))
	}

	byName(name: string) {
		return new CatalogItemLvl_1(this.el.locator(`xpath=//a[text()="${name}"]/parent::li`))
	}
}
