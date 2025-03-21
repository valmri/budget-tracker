import { createElement } from '../utils';
import { ModalField } from './modal_input';

interface Props {
	onSubmit(values: FormData): void;
}

export function ModalForm(props: Props) {
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (event.currentTarget instanceof HTMLFormElement) {
			props.onSubmit(new FormData(event.currentTarget));
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
			createElement('div', { className: 'grid gap-1' }, {}, [
				ModalField({
					inputType: 'datetime-local',
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
