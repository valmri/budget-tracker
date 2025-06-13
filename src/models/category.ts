import { v7 as uuidV7 } from 'uuid';

export type CategoryOmitted = Omit<
	Category,
	'createdAt' | 'updatedAt' | 'update' | 'serialize'
>;

export class Category {
	readonly #id: string;

	#name: string = '';

	readonly #createdAt: Date;

	get id(): string {
		return this.#id;
	}

	get name(): string {
		return this.#name;
	}

	get createdAt(): Date {
		return this.#createdAt;
	}

	set name(n: string) {
		this.#name = n;
	}

	constructor(payload?: Partial<Category>) {
		this.#id = payload?.id ?? uuidV7();
		this.#createdAt = new Date();

		if (payload && payload.name) {
			this.#name = payload.name;
		}
	}

	update(payload: Partial<CategoryOmitted>) {
		if (payload.name && payload.name !== this.#name) {
			this.#name = payload.name;
		}

		return this;
	}

	serialize() {
		return {
			id: this.#id,
			name: this.#name,
			createdAt: this.#createdAt.toISOString(),
		};
	}
}
