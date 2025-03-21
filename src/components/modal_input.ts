import { createElement } from '../utils';

interface Props {
	inputType: string;
	name: string;
	id?: string | undefined;
	label: string;
	required?: boolean;
}

export function ModalField(props: Props) {
	const id = props.id ?? props.name;

	return createElement('div', { className: 'grid gap-1' }, {}, [
		createElement('label', { htmlFor: id }, {}, props.label),
		createElement(
			'input',
			{
				type: props.inputType,
				name: props.name,
				id,
				className: 'rounded border border-slate-300 p-3',
				required: props.required ?? false,
			},
			{},
			null,
		),
	]);
}
