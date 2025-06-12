import { describe, it, vi } from 'vitest';

import { createElement } from '../src/renderer/utils';

// 1 -> unitaires (vitest, jest)
// 2 -> intégration (vitest, jest)
// 3 -> E2E (playwright, cypress)

describe('createElement', () => {
	it('should create a paragraph without attributes and events', ({ expect }) => {
		// 1. Arrange

		// 2. Act
		const result = createElement('p', {}, {}, 'paragraphe');

		// 3. Assert
		expect(result).toBeInstanceOf(HTMLParagraphElement);
		expect(result.textContent).toBe('paragraphe');
	});

	it('should create an element with corresponding attributes', ({ expect }) => {
		// 1. Arrange

		// 2. Act
		const result = createElement(
			'button',
			{
				'type': 'reset',
				'id': 'my-btn',
				'data-test': 'btn',
			},
			{},
			null,
		);

		// 3. Assert
		expect(result.type).toBe('reset');
		expect(result.id).toBe('my-btn');
		expect(result.dataset['test']).toBe('btn');
	});

	it('should handle element events', ({ expect }) => {
		// 1. Arrange
		const handleClick = vi.fn(() => console.log('called'));

		// 2. Act
		const result = createElement(
			'button',
			{},
			{
				click: handleClick,
			},
			null,
		);
		result.click();

		// 3. Assert
		expect(handleClick).toHaveBeenCalled();
	});

	it('should render multiple children', ({ expect }) => {
		// 1. Arrange
		// 2. Act
		const result = createElement('div', {}, {}, [
			createElement('span', {}, {}, 'span content'),
			createElement('p', {}, {}, 'p content'),
			createElement('strong', {}, {}, 'strong content'),
		]);

		// 3. Assert
		// Assert children length
		expect(result.children.length).toBe(3);

		// Assert first child creation
		expect(result.children[0]).toBeInstanceOf(HTMLSpanElement);
		expect(result.children[0]?.textContent).toBe('span content');

		// Assert second child creation
		expect(result.children[1]).toBeInstanceOf(HTMLParagraphElement);
		expect(result.children[1]?.textContent).toBe('p content');

		// Assert third child creation
		expect(result.children[2]).toBeInstanceOf(HTMLElement);
		expect(result.children[2]?.textContent).toBe('strong content');
	});
});

// 1. Arrange
// 2. Act
// 3. Assert
