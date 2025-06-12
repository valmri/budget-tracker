import { afterEach, beforeEach, describe, it, vi } from 'vitest';

import { Transaction } from '../src/models/transaction';
import { InMemoryStorage } from '../src/storage/in_memory_storage';

describe('storage', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should create an empty array', ({ expect }) => {
		// 1. Arrange
		const storage = new InMemoryStorage();

		// 2. Act

		// 3. Assert
		expect(storage.transactionsCount()).toBe(0);
	});

	it('should add a new transaction', ({ expect }) => {
		// 1. Arrange
		const storage = new InMemoryStorage();
		const payload = {
			currency: 'EUR',
			amount: 10,
			label: 'Salaire',
			type: 'income',
			operatedAt: new Date(),
		} as const;
		const today = new Date();
		const startLength = storage.transactionsCount();

		vi.setSystemTime(today);

		// 2. Act
		const output = storage.createTransaction(payload);
		const firstTransaction = storage.listTransactions().at(0);

		// 3. Assert
		expect(storage.transactionsCount()).toBe(1);
		expect(firstTransaction).toBeInstanceOf(Transaction);
		expect(firstTransaction).toStrictEqual(output);
		expect(storage.transactionsCount()).toStrictEqual(startLength + 1);
	});

	it('should update an existing transaction', ({ expect }) => {
		// 1. Arrange
		const storage = new InMemoryStorage();
		const transaction = storage.createTransaction({
			label: 'transaction',
			amount: 9,
			currency: 'EUR',
			type: 'expense',
			operatedAt: new Date(),
		});
		const startLength = storage.transactionsCount();
		const updatedLabel = 'nouveau label';

		// 2. Act
		const output = storage.updateTransaction(transaction.id, {
			label: updatedLabel,
		});

		// 3. Assert
		expect(output?.label).toStrictEqual(updatedLabel);
		expect(storage.transactionsCount()).toStrictEqual(startLength);
	});

	it('should delete an existing transaction', ({ expect }) => {
		// 1. Arrange
		const storage = new InMemoryStorage();
		const transaction = storage.createTransaction({
			label: 'transaction',
			amount: 9,
			currency: 'EUR',
			type: 'expense',
			operatedAt: new Date(),
		});
		const startLength = storage.transactionsCount();

		// 2. Act
		storage.deleteTransaction(transaction.id);

		// 3. Assert
		expect(storage.transactionsCount()).toStrictEqual(startLength - 1);
	});

	it('should find an existing transaction by its id', ({ expect }) => {
		// 1. Arrange
		const storage = new InMemoryStorage();
		const transaction = storage.createTransaction({
			label: 'transaction',
			amount: 9,
			currency: 'EUR',
			type: 'expense',
			operatedAt: new Date(),
		});

		// 2. Act
		const output = storage.getTransaction(transaction.id);

		// 3. Assert
		expect(output?.id).toStrictEqual(transaction.id);
	});
});
