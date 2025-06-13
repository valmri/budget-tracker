import { v7 as uuidV7 } from 'uuid';

import type { ChangeRateConverter } from '../compute/change_rate_converter';
import type { Category } from './category';

import { inverseCurrency } from '../utils';

export type TransactionType = 'expense' | 'income';
export type Currency = 'EUR' | 'USD';

export type TransactionOmitted = Omit<
	Transaction,
	'createdAt' | 'updatedAt' | 'category' | 'update' | 'serialize'
> & { categoryId?: string };

export class Transaction {
	readonly #changeRateConverter: ChangeRateConverter;

	readonly #id: string;

	#type: TransactionType = 'expense';

	#label: string = '';

	#amount: number = 0;

	#convertedAmount: number = 0;

	#currency: Currency = 'EUR';

	#convertedCurrency: Currency = 'EUR';

	#category: Category | undefined;

	#operatedAt: Date = new Date();

	readonly #createdAt: Date;

	#updatedAt: Date;

	get id(): string {
		return this.#id;
	}

	get type(): TransactionType {
		return this.#type;
	}

	get label(): string {
		return this.#label;
	}

	get amount(): number {
		return this.#amount;
	}

	get convertedAmount(): number {
		return this.#convertedAmount;
	}

	get currency(): Currency {
		return this.#currency;
	}

	get convertedCurrency(): Currency {
		return this.#convertedCurrency;
	}

	get category(): Category | undefined {
		return this.#category;
	}

	get operatedAt(): Date {
		return this.#operatedAt;
	}

	get createdAt(): Date {
		return this.#createdAt;
	}

	get updatedAt(): Date {
		return this.#updatedAt;
	}

	set type(t: TransactionType) {
		this.#type = t;
	}

	set label(l: string) {
		this.#label = l;
	}

	set amount(a: number) {
		this.#amount = a;
	}

	set convertedAmount(a: number) {
		this.#convertedAmount = a;
	}

	set currency(c: Currency) {
		this.#currency = c;
	}

	set convertedCurrency(c: Currency) {
		this.#convertedCurrency = c;
	}

	set category(c: Category | undefined) {
		this.#category = c;
	}

	set operatedAt(date: Date) {
		this.#operatedAt = date;
	}

	set updatedAt(date: Date) {
		this.#updatedAt = date;
	}

	constructor(categories: Array<Category>, changeRateConverter: ChangeRateConverter, payload?: Partial<TransactionOmitted>) {
		this.#changeRateConverter = changeRateConverter;
		this.#id = payload?.id ?? uuidV7();
		this.#createdAt = new Date();
		this.#updatedAt = new Date();

		if (payload && payload.type) {
			this.#type = payload.type;
		}

		if (payload && payload.label) {
			this.#label = payload.label;
		}

		if (payload && payload.amount) {
			this.#amount = payload.amount;
			this.#convertedAmount = changeRateConverter.convert(this.#amount, payload?.currency ?? this.#currency);
		}

		if (payload && payload.currency) {
			this.#currency = payload.currency;
			this.#convertedCurrency = inverseCurrency(this.#currency);
		}

		if (payload && payload.categoryId && categories) {
			this.#category = categories.find((c) => c.id === payload.categoryId);
		}

		this.#operatedAt = payload && payload.operatedAt ? new Date(payload.operatedAt) : new Date();
	}

	update(payload: Partial<TransactionOmitted>, categories: Array<Category>) {
		if (payload.type && payload.type !== this.#type) {
			this.#type = payload.type;
		}

		if (payload.label && payload.label !== this.#label) {
			this.#label = payload.label;
		}

		if (payload.amount && payload.amount !== this.#amount) {
			this.#amount = payload.amount;
			this.#convertedAmount = this.#changeRateConverter.convert(this.#amount, payload.currency ?? this.#currency);
		}

		if (payload.currency && payload.currency !== this.#currency) {
			this.#currency = payload.currency;
			this.#convertedCurrency = inverseCurrency(this.#currency);
		}

		if (payload.operatedAt && payload.operatedAt !== this.#operatedAt) {
			this.#operatedAt = new Date(payload.operatedAt);
		}

		if (payload.categoryId) {
			this.#category = categories.find((c) => c.id === payload.categoryId);
		}

		this.#updatedAt = new Date();

		return this;
	}

	serialize() {
		return {
			id: this.#id,
			type: this.#type,
			label: this.#label,
			amount: this.#amount,
			currency: this.#currency,
			categoryId: this.#category ? this.#category.id : undefined,
			operatedAt: this.#operatedAt.toISOString(),
			createdAt: this.#createdAt.toISOString(),
			updatedAt: this.#updatedAt.toISOString(),
		};
	}
}
