import { createElement, createSVGElement } from '../renderer/utils';

interface ButtonProps {
	variant: 'normal' | 'square';
	action: 'primary' | 'danger' | 'secondary';
	size?: 'md' | 'sm' | 'lg';
	content?: string;
	icon?: 'edit' | 'delete' | 'x' | 'arrow-left' | 'arrow-right';
	className?: string;
	events?: Partial<Record<keyof HTMLElementEventMap, (...args: Array<any>) => void>>;
}

export function Button(props: ButtonProps) {
	let className = 'cursor-pointer rounded text-center transition-colors flex items-center justify-center gap-2';

	if (props.variant === 'normal') {
		className += ' px-4 py-3';
	} else if (props.variant === 'square') {
		if (props.size === 'lg') {
			className += ' size-12';
		} else if (props.size === 'md') {
			className += ' size-10';
		} else {
			className += ' size-8';
		}
	}



	switch (props.action) {
		case 'primary': {
			className += ' bg-indigo-600 text-indigo-50 hover:bg-indigo-700';
			break;
		}
		case 'danger': {
			className += ' bg-red-600 text-white hover:bg-red-700';
			break;
		}
		case 'secondary': {
			className += ' bg-gray-200 text-gray-800 hover:bg-gray-300';
			break;
		}
	}

	if (props.className) {
		className += ` ${props.className}`;
	}

	let iconComponent = null;

	if (props.icon) {
		iconComponent = createSVGElement('svg', { className: 'size-4' }, {}, [
			createSVGElement('use', { href: `#${props.icon}` }, {}, []),
		]);
	}

	return createElement(
		'button',
		{
			type: 'button',
			className,
		},
		props.events ?? {},
		[
			props.content ? createElement('span', {}, {}, props.content) : null,
			iconComponent,
		],
	);
}
