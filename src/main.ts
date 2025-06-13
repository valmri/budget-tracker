// @ts-expect-error - font files
import '@fontsource-variable/geist-mono';

import './style.css';
import { Calculator } from './compute/calculator';
import { ChangeRateConverter } from './compute/change_rate_converter';
import { LocalStorage } from './storage/local_storage';

const actions = document.querySelector<HTMLElement>('#actions');
const history = document.querySelector<HTMLElement>('#history');
const balance = document.querySelector<HTMLElement>('#balance');
const salary = document.querySelector<HTMLElement>('#salary');

if (!actions || !history || !balance || !salary) {
	throw new Error('Root elements not found');
}

const calculator = new Calculator({
	storage: new LocalStorage(),
	changeRateConverter: new ChangeRateConverter(),
	dom: {
		actions,
		history,
		balance,
		salary,
	},
});

await calculator.changeRateConverter.fetchRates();

calculator.render();
