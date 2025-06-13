import { createElement } from '../renderer/utils';

interface Props {
	inputType: string;
	name: string;
	id?: string | undefined;
	label: string;
	required?: boolean;
	value?: string | undefined;
	className?: string;
	placeholder?: string;
	events?: Partial<Record<keyof HTMLElementEventMap, (...args: Array<any>) => void>>;
}

export function ModalField(props: Props) {
	const id = props.id ?? props.name;

	return createElement('div', { className: `grid gap-1 ${props.className}` }, {}, [
		createElement('label', { htmlFor: id }, {}, props.label),
		createElement(
			'input',
			{
				type: props.inputType,
				name: props.name,
				id,
				placeholder: props.placeholder ?? '',
				className: 'rounded border border-slate-300 p-3 bg-white',
				required: props.required ?? false,
				value: props.value ?? '',
			},
			props.events ?? {},
			null,
		),
	]);
}

interface SelectProps {
	name: string;
	id?: string | undefined;
	label: string;
	required?: boolean;
	options: Array<string | [string, string]>;
	value?: string | undefined;
}

export function ModalSelect(props: SelectProps) {
	const id = props.id ?? props.name;

	return createElement('div', { className: 'grid gap-1' }, {}, [
		createElement('label', { htmlFor: id }, {}, props.label),
		createElement(
			'select',
			{
				name: props.name,
				id,
				className: 'rounded border border-slate-300 p-3 bg-white',
				required: props.required ?? false,
				value: props.value ?? '',
			},
			{},
			props.options.map((option) => {
				if (typeof option === 'string') {
					return createElement(
						'option',
						{ value: option, selected: option === props.value },
						{},
						option,
					)
				}

				return createElement(
					'option',
					{ value: option[0], selected: option[0] === props.value },
					{},
					option[1],
				);
			}),
		),
	]);
}
