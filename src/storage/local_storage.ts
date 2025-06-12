import { Transaction, type TransactionInterface } from '../models/transaction';
import { type StorageInterface } from './storage_interface';

export class LocalStorage implements StorageInterface {
	#storageKey = 'transactions';
	#transactions: Array<Transaction> = [];

	constructor() {
		this.#loadFromStorage();
	}

	#save() {
		JSON.stringify(this.#transactions.map((transaction) => transaction.toJSON()));
	}

	#loadFromStorage(): void {
		const encoded = window.localStorage.getItem(this.#storageKey);

		if (!encoded) {
			this.#transactions = [];
			return;
		}

		const decoded = JSON.parse(encoded);

		this.#transactions = Array.isArray(decoded)
			? decoded.map((item) => Transaction.fromJSON(item))
			: [Transaction.fromJSON(decoded)];
	}

	all(): Array<Transaction> {
		return this.#transactions;
	}

	show(transactionId: string): Transaction | undefined {
		return this.#transactions.find((transaction) => transaction.getId() === transactionId);
	}

	create(payload: Omit<TransactionInterface, 'id' | 'createdAt' | 'updatedAt'>): Transaction {
		const transaction = Transaction.fromJSON(payload);
		const transactionExists = this.#transactions.some((t) => t.getId() === transaction.getId());

		if (!transactionExists) {
			this.#transactions.push(transaction);
			this.#save();
		}

		return transaction;
	}

	update(
		transactionId: TransactionInterface['id'],
		payload: Partial<Omit<TransactionInterface, 'id' | 'createdAt' | 'updatedAt'>>,
	): Transaction | undefined {
		this.#transactions = this.#transactions.map((transaction) => {
			if (transactionId !== transaction.getId()) {
				return transaction;
			}

			if (payload.label && payload.label !== transaction.getLabel()) {
				transaction.setLabel(payload.label);
			}

			if (payload.amount && payload.amount !== transaction.getAmount()) {
				transaction.setAmount(payload.amount);
			}

			if (payload.currency && payload.currency !== transaction.getCurrency()) {
				transaction.setCurrency(payload.currency);
			}

			if (payload.operatedAt && payload.operatedAt !== transaction.getOperatedAt()) {
				transaction.setOperatedAt(payload.operatedAt);
			}

			this.#save();
			return transaction;
		});

		return this.show(transactionId);
	}

	delete(transactionId: string): void {
		this.#transactions = this.#transactions.filter((t) => t.getId() !== transactionId);
		this.#save();
	}
}
