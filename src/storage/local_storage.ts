import { Transaction } from '../models/transaction';
import { type StorageInterface } from './storage_interface';

export class LocalStorage implements StorageInterface {
	#storageKey = 'transactions';

	#getValue() {
		const encoded = window.localStorage.getItem(this.#storageKey);

		if (!encoded) {
			return [];
		}

		const decoded = JSON.parse(encoded);

		if (Array.isArray(decoded)) {
			return decoded.map((item) => Transaction.fromJSON(item));
		}

		return [Transaction.fromJSON(decoded)];
	}

	all(): Array<Transaction> {
		return this.#getValue();
	}

	show(transactionId: string): Transaction | undefined {
		return this.#getValue().find((transaction) => transaction.getId() === transactionId);
	}

	create(payload: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Transaction {
		const transaction = Transaction.fromJSON(payload);

		this.#getValue().push(transaction);

		return transaction;
	}

	update(
		transactionId: Transaction['id'],
		payload: Partial<Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>>,
	): Transaction | undefined {
		this.#getValue().map((transaction) => {
			if (transactionId !== transaction.id) {
				return transaction;
			}

			return {
				...transaction,
				...payload,
				updatedAt: new Date(),
			};
		});

		return this.show(transactionId);
	}

	delete(transactionId: string): void {
		let old = this.#getValue();
		old = this.#getValue().filter((transaction) => transactionId !== transaction.getId());
	}
}
