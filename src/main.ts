// @ts-expect-error - font files
import '@fontsource-variable/geist-mono';

import './style.css';
import { createElement } from './utils';

const root = document.querySelector<HTMLElement>('#root');

if (!root) {
	throw new Error('Root element not found');
}

function App() {
	const fragment = document.createDocumentFragment();

	fragment.append(
		createElement(
			'h1',
			{
				className: 'text-2xl',
			},
			{},
			'Budget Tracker',
		),
	);

	// fragment.append(Modal());
	// fragment.append(OperationTable());

	return fragment;
}

root.append(App());
