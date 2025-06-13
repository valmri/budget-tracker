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
const categories = document.querySelector<HTMLElement>('#categories');

if (!actions || !history || !balance || !salary || !categories) {
	throw new Error('Root elements not found');
}

const converter = new ChangeRateConverter();
const storage = new LocalStorage(converter);

const calculator = new Calculator({
	storage: storage,
	changeRateConverter: converter,
	dom: {
		actions,
		history,
		balance,
		salary,
		categories,
	},
});

await calculator.changeRateConverter.fetchRates();
calculator.storage.hydrate();

calculator.render();
