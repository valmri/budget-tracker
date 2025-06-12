import type { StorageInterface } from './storage_interface';

import { Transaction, type TransactionInterface } from '../models/transaction';

export class InMemoryStorage implements StorageInterface {
	transactions: Array<Transaction> = [];

	all(): Array<Transaction> {
		return this.transactions;
	}

	show(transactionId: string): Transaction | undefined {
		return this.transactions.find((transaction) => transaction.getId() === transactionId);
	}

	create(payload: Omit<TransactionInterface, 'id' | 'createdAt' | 'updatedAt'>): Transaction {
		const transaction = Transaction.fromJSON(payload);

		this.transactions.push(transaction);

		return transaction;
	}

	update(
		transactionId: TransactionInterface['id'],
		payload: Partial<Omit<TransactionInterface, 'id' | 'createdAt' | 'updatedAt'>>,
	): Transaction | undefined {
		this.transactions = this.transactions.map((transaction) => {
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

			return transaction;
		});

		return this.show(transactionId);
	}

	delete(transactionId: TransactionInterface['id']): void {
		this.transactions = this.transactions.filter(
			(transaction) => transactionId !== transaction.getId(),
		);
	}
}
