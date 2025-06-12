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
await calculator.fetchChangeRates();

const t1 = storage.create({
	amount: 25,
	type: 'expense',
	label: 'netflix',
	currency: 'EUR',
	operatedAt: new Date(2025, 6, 1),
});

console.log({ conversionEurDol: calculator.convert(t1.getAmount(), t1.getCurrency()) });

const t2 = storage.create({
	amount: 30,
	type: 'expense',
	label: 'youtube',
	currency: 'USD',
	operatedAt: new Date(2025, 6, 3),
});

console.log({ conversionDolEur: calculator.convert(t2.getAmount(), t1.getCurrency()) });

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
