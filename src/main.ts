// @ts-expect-error - font files
import '@fontsource-variable/geist-mono';

import './style.css';
import { Calculator } from './compute/calculator';
import { ChangeRateConverter } from './compute/change_rate_converter';
import { InMemoryStorage } from './storage/in_memory_storage';

const root = document.querySelector<HTMLElement>('#root');

if (!root) {
	throw new Error('Root element not found');
}

const calculator = new Calculator(new InMemoryStorage(), new ChangeRateConverter());

await calculator.changeRateConverter.fetchRates();

const t1 = calculator.storage.createTransaction({
	amount: 25,
	type: 'expense',
	label: 'netflix',
	currency: 'EUR',
	operatedAt: new Date(2025, 6, 1),
});

console.log({ conversionEurDol: calculator.changeRateConverter.convert(t1.amount, t1.currency) });

const t2 = calculator.storage.createTransaction({
	amount: 30,
	type: 'expense',
	label: 'youtube',
	currency: 'USD',
	operatedAt: new Date(2025, 6, 3),
});

console.log({ conversionDolEur: calculator.changeRateConverter.convert(t2.amount, t1.currency) });

calculator.storage.createTransaction({
	amount: 99,
	type: 'income',
	label: 'nord vpn',
	currency: 'EUR',
	operatedAt: new Date(2025, 6, 9),
});
