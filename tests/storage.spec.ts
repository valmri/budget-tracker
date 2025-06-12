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
		expect(storage.transactions.length).toBe(0);
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
		const startLength = storage.transactions.length;

		vi.setSystemTime(today);

		// 2. Act
		const output = storage.create(payload);

		// 3. Assert
		expect(storage.transactions.length).toBe(1);
		expect(storage.transactions.at(0)).toBeInstanceOf(Transaction);
		expect(storage.transactions[0]).toStrictEqual(output);
		expect(storage.transactions).toHaveLength(startLength + 1);
	});

	it('should update an existing transaction', ({ expect }) => {
		// 1. Arrange
		const storage = new InMemoryStorage();
		const transaction = storage.create({
			label: 'transaction',
			amount: 9,
			currency: 'EUR',
			type: 'expense',
			operatedAt: new Date(),
		});
		const startLength = storage.transactions.length;
		const updatedLabel = 'nouveau label';

		// 2. Act
		const output = storage.update(transaction.getId(), {
			label: updatedLabel,
		});

		// 3. Assert
		expect(output?.getLabel()).toStrictEqual(updatedLabel);
		expect(storage.transactions).toHaveLength(startLength);
	});

	it('should delete an existing transaction', ({ expect }) => {
		// 1. Arrange
		const storage = new InMemoryStorage();
		const transaction = storage.create({
			label: 'transaction',
			amount: 9,
			currency: 'EUR',
			type: 'expense',
			operatedAt: new Date(),
		});
		const startLength = storage.transactions.length;

		// 2. Act
		storage.delete(transaction.getId());

		// 3. Assert
		expect(storage.transactions).toHaveLength(startLength - 1);
	});

	it('should find an existing transaction by its id', ({ expect }) => {
		// 1. Arrange
		const storage = new InMemoryStorage();
		const transaction = storage.create({
			label: 'transaction',
			amount: 9,
			currency: 'EUR',
			type: 'expense',
			operatedAt: new Date(),
		});

		// 2. Act
		const output = storage.show(transaction.getId());

		// 3. Assert
		expect(output?.getId()).toStrictEqual(transaction.getId());
	});
});
