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
		vi.setSystemTime(today);

		// 2. Act
		storage.create(payload);

		// 3. Assert
		expect(storage.transactions.length).toBe(1);
		expect(storage.transactions.at(0)).toBeInstanceOf(Transaction);
		expect(storage.transactions.at(0)?.getLabel()).toBe(payload.label);
		expect(storage.transactions.at(0)?.getAmount()).toBe(payload.amount);
		expect(storage.transactions.at(0)?.getCurrency()).toBe(payload.currency);
		expect(storage.transactions.at(0)?.getType()).toBe(payload.type);
		expect(storage.transactions.at(0)?.getOperatedAt()).toBe(payload.operatedAt);
		expect(storage.transactions.at(0)?.getCreatedAt()).toStrictEqual(today);
	});
});
