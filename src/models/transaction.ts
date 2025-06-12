import { v7 as uuidV7 } from 'uuid';

export type TransactionType = 'expense' | 'income';
export type Currency = 'EUR' | 'USD';

export interface TransactionInterface {
	id: string;
	type: TransactionType;
	label: string;
	amount: number;
	currency: Currency;
	operatedAt: Date;
	createdAt: Date;
	updatedAt: Date;
}

export class Transaction {
	#id: string;

	#type: TransactionType = 'expense';

	#label: string = '';

	#amount: number = 0;

	#currency: Currency = 'EUR';

	#operatedAt: Date = new Date();

	#createdAt: Date;

	#updatedAt: Date;

	constructor() {
		this.#id = uuidV7();
		this.#createdAt = new Date();
		this.#updatedAt = new Date();
	}

	getId(): TransactionInterface['id'] {
		return this.#id;
	}

	getCreatedAt(): TransactionInterface['createdAt'] {
		return this.#createdAt;
	}

	getUpdatedAt(): TransactionInterface['updatedAt'] {
		return this.#updatedAt;
	}

	setUpdatedAt(date: Date) {
		this.#updatedAt = date;
		return this;
	}

	getType(): TransactionInterface['type'] {
		return this.#type;
	}

	setType(type: TransactionType) {
		this.#type = type;
		return this;
	}

	getLabel(): TransactionInterface['label'] {
		return this.#label;
	}

	setLabel(label: string) {
		this.#label = label;
		return this;
	}

	getAmount(): TransactionInterface['amount'] {
		return this.#amount / 100;
	}

	setAmount(amount: number) {
		this.#amount = amount * 100;
		return this;
	}

	getCurrency(): TransactionInterface['currency'] {
		return this.#currency;
	}

	setCurrency(currency: Currency) {
		this.#currency = currency;
		return this;
	}

	getOperatedAt(): TransactionInterface['operatedAt'] {
		return this.#operatedAt;
	}

	setOperatedAt(operatedAt: Date) {
		this.#operatedAt = operatedAt;
		return this;
	}

	static fromJSON(payload: any) {
		const transaction = new this();

		if (typeof payload !== 'object') {
			throw new TypeError('Expected object, received any.');
		}

		if (!payload) {
			return transaction;
		}

		if (payload['type']) {
			transaction.setType(payload['type']);
		}

		if (payload['label']) {
			transaction.setLabel(payload['label']);
		}

		if (payload['amount']) {
			transaction.setAmount(payload['amount']);
		}

		if (payload['currency']) {
			transaction.setCurrency(payload['currency']);
		}

		if (payload['operatedAt']) {
			transaction.setOperatedAt(payload['operatedAt']);
		}

		return transaction;
	}

	toJSON() {
		return {
			id: this.#id,
			type: this.#type,
			label: this.#label,
			amount: this.#amount,
			currency: this.#currency,
			operatedAt: this.#operatedAt.toISOString(),
			createdAt: this.#createdAt.toISOString(),
			updatedAt: this.#updatedAt.toISOString(),
		};
	}
}
