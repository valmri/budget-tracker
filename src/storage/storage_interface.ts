import type { Transaction, TransactionOmitted } from '../models/transaction';

export interface StorageInterface {
	listTransactions(): Array<Transaction>;

	getTransaction(transactionId: Transaction['id']): Transaction | undefined;

	createTransaction(payload: TransactionOmitted): Transaction;

	updateTransaction(
		transactionId: Transaction['id'],
		payload: Partial<TransactionOmitted>,
	): Transaction | undefined;

	deleteTransaction(transactionId: Transaction['id']): void;

	transactionsCount(): number;

	setSalary(salary: number): void;

	getSalary(): number;
}
