import type { Category } from '../models/category';

import { createElement } from '../renderer/utils';
import { Button } from './button';
import { ModalField } from './modal_input';

interface CategoriesProps {
	categories: Array<Category>;
	onCategoryCreate: (name: Category['name']) => void;
	onCategoryDelete: (id: Category['id']) => void;
}

export function Categories(props: CategoriesProps) {
	const fragment = document.createDocumentFragment();

	function handleFormSubmit(event: SubmitEvent) {
		event.preventDefault();

		if (!(event.target instanceof HTMLFormElement)) {
			return;
		}

		const formData = new FormData(event.target);
		const name = formData.get('name') as string;

		if (name) {
			props.onCategoryCreate(name);
			event.target.reset();
		}
	}

	function handleDeleteCategory(event: MouseEvent, categoryId: Category['id']) {
		event.preventDefault();

		props.onCategoryDelete(categoryId)
	}

	const form = createElement('form', {}, { submit: handleFormSubmit }, [
		ModalField({
			inputType: 'text',
			name: 'name',
			label: 'Nom de la catégorie',
			placeholder: 'Ex: Courses',
			required: true,
		}),
	]);

	const list = createElement(
		'ul',
		{ className: 'mt-4 grid gap-1 divide-y divide-gray-200' },
		{},
		props.categories.map((category) =>
			createElement('li', { className: 'flex items-center gap-2 justify-between p-2' }, {}, [
				createElement('p', {}, {}, category.name),
				Button({
					variant: 'square',
					icon: 'delete',
					action: 'danger',
					size: 'sm',
					events: {
						click: (event) => handleDeleteCategory(event, category.id),
					}
				})
			]),
		),
	);

	fragment.append(form);
	fragment.append(list);

	return fragment;
}
