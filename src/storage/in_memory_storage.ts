import type { StorageInterface } from './storage_interface';

import { Transaction, type TransactionOmitted } from '../models/transaction';

export class InMemoryStorage implements StorageInterface {
	#transactions: Array<Transaction> = [];
	#salary: number = 0;

	listTransactions(): Array<Transaction> {
		return this.#transactions;
	}

	getTransaction(transactionId: string): Transaction | undefined {
		return this.#transactions.find((transaction) => transaction.id === transactionId);
	}

	createTransaction(payload: TransactionOmitted): Transaction {
		const transaction = new Transaction(payload);
		this.#transactions.push(transaction);

		return transaction;
	}

	updateTransaction(
		transactionId: Transaction['id'],
		payload: Partial<TransactionOmitted>,
	): Transaction | undefined {
		this.#transactions = this.#transactions.map((transaction) => {
			if (transactionId !== transaction.id) {
				return transaction;
			}

			return transaction.update(payload);
		});

		return this.getTransaction(transactionId);
	}

	deleteTransaction(transactionId: Transaction['id']): void {
		this.#transactions = this.#transactions.filter(
			(transaction) => transactionId !== transaction.id,
		);
	}

	transactionsCount(): number {
		return this.#transactions.length;
	}

	setSalary(salary: number) {
		this.#salary = salary;
	}

	getSalary(): number {
		return this.#salary;
	}
}
