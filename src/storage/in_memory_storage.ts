import { v7 as uuidV7 } from 'uuid';

import type { StorageInterface, Transaction } from './storage_interface';

export class InMemoryStorage implements StorageInterface {
	transactions: Array<Transaction> = [];

	all(): Array<Transaction> {
		return this.transactions;
	}

	show(transactionId: string): Transaction | undefined {
		return this.transactions.find((transaction) => transaction.id === transactionId);
	}

	create(payload: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Transaction {
		const transaction = {
			...payload,
			id: uuidV7(),
			createdAt: new Date(),
			updatedAt: new Date(),
		} satisfies Transaction;

		this.transactions.push(transaction);

		return transaction;
	}

	update(
		transactionId: Transaction['id'],
		payload: Partial<Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>>,
	): Transaction | undefined {
		// eslint-disable-next-line sonarjs/no-ignored-return
		this.transactions.map((transaction) => {
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

	delete(transactionId: Transaction['id']): void {
		this.transactions = this.transactions.filter((transaction) => transactionId !== transaction.id);
	}
}
