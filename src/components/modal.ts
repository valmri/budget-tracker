import { createElement, createSVGElement } from '../utils';
import { ModalForm } from './modal_form';

function handleFormSubmit(values: FormData) {
	for (const value of values) console.log(value);
}

export function Modal() {
	function handleOpenModal(event: MouseEvent) {
		event.preventDefault();
		modal.showModal();
	}

	function handleCloseModal(event: MouseEvent) {
		event.preventDefault();
		modal.close();
	}

	const fragment = document.createDocumentFragment();

	const trigger = createElement(
		'button',
		{
			'type': 'button',
			'className':
				'my-6 w-full rounded bg-indigo-600 p-3 text-center text-indigo-50 transition-colors hover:bg-indigo-700',
			'data-modal-id': 'app-operation-modal',
		},
		{
			click: handleOpenModal,
		},
		'Ajouter une opération',
	);

	const modal = createElement(
		'dialog',
		{
			id: 'add-operation-modal',
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
						'Ajouter une opération',
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
			ModalForm({ onSubmit: handleFormSubmit }),
		],
	);

	fragment.append(trigger);
	fragment.append(modal);

	return fragment;
}
