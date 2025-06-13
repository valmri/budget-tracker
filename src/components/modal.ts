import type { Transaction } from '../models/transaction';

import { createElement, createSVGElement } from '../renderer/utils';
import { ModalForm } from './modal_form';

interface ModalProps {
	id: string;
	modalTitle: string;
	trigger: HTMLButtonElement;
	onFormSubmit(values: FormData): void;
	transaction?: Transaction | undefined;
	categories: Array<[string, string]>;
}

export function Modal(props: ModalProps) {
	function handleOpenModal(event: MouseEvent) {
		event.preventDefault();
		modal.showModal();
	}

	function handleCloseModal(event: MouseEvent) {
		event.preventDefault();
		modal.querySelector('form')?.reset();
		modal.close();
	}

	function handleFormSubmit(values: FormData) {
		props.onFormSubmit(values);
		modal.close();
	}

	const fragment = document.createDocumentFragment();

	props.trigger.dataset['modalId'] = props.id;
	props.trigger.addEventListener('click', handleOpenModal);

	const modal = createElement(
		'dialog',
		{
			id: props.id,
			className: 'w-full max-w-lg rounded shadow-sm backdrop:bg-slate-700 backdrop:opacity-30',
		},
		{},
		[
			createElement(
				'div',
				{
					className: 'flex items-center justify-between border-b-2 border-slate-200 p-4',
				},
				{},
				[
					createElement(
						'h2',
						{ className: 'text-xl font-semibold text-indigo-700 uppercase' },
						{},
						props.modalTitle,
					),
					createElement(
						'button',
						{
							'type': 'button',
							'className':
								'rounded bg-indigo-50 p-2 text-indigo-700 transition-colors hover:bg-indigo-100',
							'data-close': true,
							'aria-label': 'Fermer',
						},
						{
							click: handleCloseModal,
						},
						[
							createSVGElement('svg', { 'className': 'size-5', 'aria-hidden': true }, {}, [
								createSVGElement('use', { href: '#x-mark' }, {}, null),
							]),
						],
					),
				],
			),
			ModalForm({
				transaction: props.transaction,
				categories: props.categories,
				onSubmit: handleFormSubmit,
			}),
		],
	);

	fragment.append(props.trigger);
	fragment.append(modal);

	return fragment;
}
