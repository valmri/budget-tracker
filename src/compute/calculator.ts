import type { StorageInterface } from '../storage/storage_interface';
import type { ChangeRateConverter } from './change_rate_converter';

export class Calculator {
	readonly #storage: StorageInterface;
	readonly #changeRateConverter: ChangeRateConverter;

	constructor(storage: StorageInterface, changeRateConverter: ChangeRateConverter) {
		this.#storage = storage;
		this.#changeRateConverter = changeRateConverter;
	}

	get storage(): StorageInterface {
		return this.#storage;
	}

	get changeRateConverter(): ChangeRateConverter {
		return this.#changeRateConverter;
	}

	compute(): number {
		// eslint-disable-next-line unicorn/no-array-reduce
		return this.#storage.listTransactions().reduce((acc, transaction) => {
			if (transaction.type === 'expense') {
				return acc - transaction.amount;
			}

			return acc + transaction.amount;
		}, this.#storage.getSalary());
	}
}
