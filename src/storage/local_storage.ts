import { Transaction, type TransactionOmitted } from '../models/transaction';
import { type StorageInterface } from './storage_interface';

export class LocalStorage implements StorageInterface {
	#storageKey = 'budget_tracker';
	#transactions: Array<Transaction> = [];
	#salary: number = 0;

	constructor() {
		this.#loadFromStorage();
	}

	#save() {
		JSON.stringify({
			salary: this.#salary,
			transactions: this.#transactions.map((transaction) => transaction.serialize()),
		});
	}

	#loadFromStorage(): void {
		const encoded = window.localStorage.getItem(this.#storageKey);

		if (!encoded) {
			return;
		}

		const decoded = JSON.parse(encoded);

		if ('salary' in decoded) {
			this.#salary = decoded.salary;
		}

		if ('transactions' in decoded) {
			decoded.transactions.map((item: TransactionOmitted) => new Transaction(item));
		}
	}

	listTransactions(): Array<Transaction> {
		return this.#transactions;
	}

	getTransaction(transactionId: string): Transaction | undefined {
		return this.#transactions.find((transaction) => transaction.id === transactionId);
	}

	createTransaction(payload: TransactionOmitted): Transaction {
		const transaction = new Transaction(payload);
		const transactionExists = this.#transactions.some((t) => t.id === transaction.id);

		if (!transactionExists) {
			this.#transactions.push(transaction);
			this.#save();
		}

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

			const updatedTransaction = transaction.update(payload);
			this.#save();

			return updatedTransaction;
		});

		return this.getTransaction(transactionId);
	}

	deleteTransaction(transactionId: string): void {
		this.#transactions = this.#transactions.filter((t) => t.id !== transactionId);
		this.#save();
	}

	transactionsCount(): number {
		return this.#transactions.length;
	}

	setSalary(salary: number): void {
		this.#salary = salary;
		this.#save();
	}

	getSalary(): number {
		return this.#salary;
	}
}
