// @ts-expect-error - font files
import '@fontsource-variable/geist-mono';

import './style.css';
import { renderHeading } from './heading';
import { renderModal } from './modal';
import { renderOperationHistory } from './table';

const root = document.querySelector<HTMLElement>('#root');

if (!root) {
	throw new Error('Root element not found');
}

root.insertAdjacentHTML('afterbegin', renderModal());
root.insertAdjacentHTML('afterbegin', renderHeading());
root.insertAdjacentHTML('beforeend', renderOperationHistory());

function manageDialogs() {
	const triggers = [...document.querySelectorAll<HTMLButtonElement>('button[data-modal-id]')];

	if (triggers.length === 0) {
		return;
	}

	for (let trigger of triggers) {
		const dialogId = trigger.dataset['modalId'];

		if (!dialogId) {
			continue;
		}

		const dialog = document.querySelector<HTMLDialogElement>(`#${dialogId}`);

		if (!dialog) {
			continue;
		}

		const closeTrigger = dialog.querySelector<HTMLButtonElement>('button[data-close]');

		if (!closeTrigger) {
			continue;
		}

		trigger.addEventListener('click', (event: MouseEvent) => {
			event.preventDefault();
			dialog.showModal();
		});

		closeTrigger.addEventListener('click', (event) => {
			event.preventDefault();
			dialog.close();
		});
	}
}

manageDialogs();
