import type { Transaction, TransactionInterface } from '../models/transaction';

export interface StorageInterface {
	delete(transactionId: TransactionInterface['id']): void;

	create(payload: Omit<TransactionInterface, 'id' | 'createdAt' | 'updatedAt'>): Transaction;

	update(
		transactionId: TransactionInterface['id'],
		payload: Partial<Omit<TransactionInterface, 'id' | 'createdAt' | 'updatedAt'>>,
	): Transaction | undefined;

	show(transactionId: TransactionInterface['id']): Transaction | undefined;

	all(): Array<Transaction>;
}
