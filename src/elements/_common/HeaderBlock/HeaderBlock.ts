import { Locator } from '@playwright/test'
import BaseElement from '../../BaseElement'
import TopMenu from './TopMenu'
import Button from '../Button'
import ButtonWithBadge from '../ButtonWithBadge'

export default class HeaderBlock extends BaseElement {
	readonly logoElement: Locator
	readonly searchInput: Locator
	readonly searchButton: Button
	readonly favoriteButton: ButtonWithBadge
	readonly cartButton: ButtonWithBadge
	readonly topMenu: TopMenu

	constructor(locator: Locator) {
		super(locator)
		this.logoElement = this.el.locator('div.logo')
		this.searchInput = this.el.locator('input[name="q"]')
		this.searchButton = new Button(this.el.locator('div.search button[type="submit"]'))
		this.favoriteButton = new ButtonWithBadge(this.el.locator('a.badge-btn:nth-child(1)'))
		this.cartButton = new ButtonWithBadge(this.el.locator('a.badge-btn:nth-child(2)'))
		this.topMenu = new TopMenu(this.el.locator('xpath=//ul[@class="prk-top-menu lvl-0"]'))
	}
}
