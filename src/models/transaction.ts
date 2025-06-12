import { v7 as uuidV7 } from 'uuid';

export type TransactionType = 'expense' | 'income';
export type Currency = 'EUR' | 'USD';

export type TransactionOmitted = Omit<
	Transaction,
	'id' | 'createdAt' | 'updatedAt' | 'update' | 'serialize'
>;

export class Transaction {
	readonly #id: string;

	#type: TransactionType = 'expense';

	#label: string = '';

	#amount: number = 0;

	#currency: Currency = 'EUR';

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

	get currency(): Currency {
		return this.#currency;
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

	set currency(c: Currency) {
		this.#currency = c;
	}

	set operatedAt(date: Date) {
		this.#operatedAt = date;
	}

	set updatedAt(date: Date) {
		this.#updatedAt = date;
	}

	constructor(payload?: Partial<Transaction>) {
		this.#id = uuidV7();
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
		}

		if (payload && payload.currency) {
			this.#currency = payload.currency;
		}

		this.#operatedAt = payload && payload.operatedAt ? new Date(payload.operatedAt) : new Date();
	}

	update(payload: Partial<TransactionOmitted>) {
		if (payload.type && payload.type !== this.#type) {
			this.#type = payload.type;
		}

		if (payload.label && payload.label !== this.#label) {
			this.#label = payload.label;
		}

		if (payload.amount && payload.amount !== this.#amount) {
			this.#amount = payload.amount;
		}

		if (payload.currency && payload.currency !== this.#currency) {
			this.#currency = payload.currency;
		}

		if (payload.operatedAt && payload.operatedAt !== this.#operatedAt) {
			this.#operatedAt = new Date(payload.operatedAt);
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
			operatedAt: this.#operatedAt.toISOString(),
			createdAt: this.#createdAt.toISOString(),
			updatedAt: this.#updatedAt.toISOString(),
		};
	}
}
