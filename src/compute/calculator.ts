import type { StorageInterface } from '../storage/storage_interface';

export class Calculator {
	#storage: StorageInterface;
	#salary: number;

	constructor(storage: StorageInterface, salary: number) {
		this.#storage = storage;
		this.#salary = salary;
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
}
