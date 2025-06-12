import type { Currency } from '../models/transaction';
import type { StorageInterface } from '../storage/storage_interface';

export class Calculator {
	#storage: StorageInterface;
	#salary: number;
	#changeRates = {
		USD: { EUR: 0 },
		EUR: { USD: 0 },
	};

	constructor(storage: StorageInterface, salary: number) {
		this.#storage = storage;
		this.#salary = salary;
	}

	async fetchChangeRates() {
		const [euroResponse, dollarResponse] = await Promise.all([
			fetch(
				`https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_CHANGE_RATE_API_KEY}/pair/USD/EUR`,
			),
			fetch(
				`https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_CHANGE_RATE_API_KEY}/pair/EUR/USD`,
			),
		]);

		if (euroResponse.ok && dollarResponse.ok) {
			const [euro, dollar] = await Promise.all([euroResponse.json(), dollarResponse.json()]);

			this.#changeRates.EUR.USD = dollar.conversion_rate;
			this.#changeRates.USD.EUR = euro.conversion_rate;
		}
	}

	compute(): number {
		// eslint-disable-next-line unicorn/no-array-reduce
		return this.#storage.all().reduce((acc, transaction) => {
			if (transaction.getType() === 'expense') {
				return acc - transaction.getAmount();
			}

			return acc + transaction.getAmount();
		}, this.#salary);
	}

	convert(amount: number, currency: Currency) {
		if (currency === 'EUR') {
			return amount * this.#changeRates.EUR.USD;
		}

		return amount * this.#changeRates.USD.EUR;
	}
}
