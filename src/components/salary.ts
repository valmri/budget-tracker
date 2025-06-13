import { createElement } from '../renderer/utils';
import { ModalField } from './modal_input';

interface SalaryFormProps {
	value?: number | undefined;
	onUpdate(salary: number): void;
}

export function SalaryForm(props: SalaryFormProps) {
	function handleBlur(event: FocusEvent) {
		if (!(event.currentTarget instanceof HTMLInputElement)) {
			return;
		}

		props.onUpdate(event.currentTarget.valueAsNumber);
	}

	return createElement('form', { className: 'grid gap-4' }, {}, [
		ModalField({
			inputType: 'number',
			name: 'amount',
			label: 'Salaire',
			required: true,
			value: props.value?.toString(),
			events: {
				blur: handleBlur
			}
		}),
	])
}