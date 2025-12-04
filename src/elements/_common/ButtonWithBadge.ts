import { Locator } from '@playwright/test'
import Button from './Button'

export default class ButtonWithBadge extends Button {
	readonly badgeElement: Locator

	constructor(locator: Locator) {
		super(locator)
		this.badgeElement = this.el.locator('div.badge-btn__badge')
	}
}
