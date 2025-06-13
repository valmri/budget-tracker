import type { Currency, TransactionType } from '../models/transaction';

import { createElement } from '../renderer/utils';
import { ModalField, ModalSelect } from './modal_input';

interface Props {
	onSubmit(values: FormData): void;
}

export function ModalForm(props: Props) {
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (event.currentTarget instanceof HTMLFormElement) {
			props.onSubmit(new FormData(event.currentTarget));
			event.currentTarget.reset();
		}
	}

	return createElement(
		'form',
		{
			className: 'grid gap-4 p-4',
		},
		{
			submit: handleSubmit,
		},
		[
			createElement('div', { className: 'grid gap-4' }, {}, [
				ModalField({
					inputType: 'date',
					name: 'operation-date',
					label: "Date de l'opération",
					required: true,
				}),
				ModalField({
					inputType: 'text',
					name: 'operation-description',
					label: 'Description',
					required: true,
				}),
				ModalField({
					inputType: 'number',
					name: 'operation-amount',
					label: 'Montant',
					required: true,
				}),
				ModalSelect({
					name: 'operation-type',
					label: 'Type',
					required: true,
					options: ['income', 'expense'] satisfies Array<TransactionType>,
				}),
				ModalSelect({
					name: 'operation-currency',
					label: 'Devise',
					required: true,
					options: ['USD', 'EUR'] satisfies Array<Currency>,
				}),
				createElement(
					'button',
					{
						type: 'submit',
						className:
							'p-3 rounded bg-emerald-700 text-emerald-50 text-center transition-colors hover:bg-emerald-800',
					},
					{},
					'Ajouter',
				),
			]),
		],
	);
}
