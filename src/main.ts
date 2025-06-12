// @ts-expect-error - font files
import '@fontsource-variable/geist-mono';

import './style.css';
import { Calculator } from './compute/calculator';
import { InMemoryStorage } from './storage/in_memory_storage';

const root = document.querySelector<HTMLElement>('#root');

if (!root) {
	throw new Error('Root element not found');
}

const storage = new InMemoryStorage();

const calculator = new Calculator(storage, 1_000);

storage.create({
	amount: 25,
	type: 'expense',
	label: 'netflix',
	currency: 'EUR',
	operatedAt: new Date(2025, 6, 1),
});

storage.create({
	amount: 30,
	type: 'expense',
	label: 'youtube',
	currency: 'EUR',
	operatedAt: new Date(2025, 6, 3),
});

storage.create({
	amount: 99,
	type: 'income',
	label: 'nord vpn',
	currency: 'EUR',
	operatedAt: new Date(2025, 6, 9),
});

document.body.textContent = calculator.compute().toString();

/*function App(storage: StorageInterface) {
	console.log({ storage });
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

	fragment.append(Modal());
	// fragment.append(OperationTable());

	return fragment;
}

root.append(App(new InMemoryStorage()));*/
