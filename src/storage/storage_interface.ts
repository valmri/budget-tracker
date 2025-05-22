export interface StorageInterface {
	delete(transactionId: Transaction['id']): void;

	create(payload: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Transaction;

	update(
		transactionId: Transaction['id'],
		payload: Partial<Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>>,
	): Transaction | undefined;

	show(transactionId: Transaction['id']): Transaction | undefined;

	all(): Array<Transaction>;
}
