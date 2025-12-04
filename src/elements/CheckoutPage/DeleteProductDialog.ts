import { Locator } from '@playwright/test';
import BaseElement from '../BaseElement';
import Button from '../_common/Button';

export default class DeleteProductDialog extends BaseElement {
	readonly titleElement: Locator
	readonly contentElement: Locator
	readonly deleteButton: Button
	readonly cancelButton: Button

	constructor(locator: Locator) {
		super(locator)
		this.titleElement = this.el.locator('div.confirmation-dialog__title')
		this.contentElement = this.el.locator('div.confirmation-dialog__body')
		this.deleteButton = new Button(this.el.locator('button.confirmation-dialog__action-button--yes'))
		this.cancelButton = new Button(this.el.locator('button.confirmation-dialog__action-button--no'))
	}
}