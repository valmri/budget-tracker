import type { StorageInterface } from '../storage/storage_interface';
import type { ChangeRateConverter } from './change_rate_converter';

import { Modal } from '../components/modal';
import { OperationsTable } from '../components/table';
import { type Currency, Transaction, type TransactionType } from '../models/transaction';

interface CalculatorProps {
	storage: StorageInterface;
	changeRateConverter: ChangeRateConverter;
	dom: {
		actions: HTMLElement;
		history: HTMLElement;
		balance: HTMLElement;
	};
}

export class Calculator {
	readonly #storage: StorageInterface;
	readonly #changeRateConverter: ChangeRateConverter;
	readonly #actionsContainer: HTMLElement;
	readonly #historyContainer: HTMLElement;
	readonly #balanceContainer: HTMLElement;

	constructor(props: CalculatorProps) {
		this.#storage = props.storage;
		this.#changeRateConverter = props.changeRateConverter;
		this.#actionsContainer = props.dom.actions;
		this.#historyContainer = props.dom.history;
		this.#balanceContainer = props.dom.balance;
	}

	get storage(): StorageInterface {
		return this.#storage;
	}

	get changeRateConverter(): ChangeRateConverter {
		return this.#changeRateConverter;
	}

	compute(): number {
		// eslint-disable-next-line unicorn/no-array-reduce
		return this.#storage.listTransactions().reduce((acc, transaction) => {
			if (transaction.type === 'expense') {
				return acc - transaction.amount;
			}

			return acc + transaction.amount;
		}, this.#storage.getSalary());
	}

	handleCreateTransaction(values: FormData) {
		const transaction = new Transaction();

		for (const [name, value] of values) {
			if (name === 'operation-date') {
				transaction.operatedAt = new Date(value as string);
			}

			if (name === 'operation-description') {
				transaction.label = value as string;
			}

			if (name === 'operation-amount') {
				transaction.amount = Number(value as string);
			}

			if (name === 'operation-type') {
				transaction.type = value as TransactionType;
			}

			if (name === 'operation-currency') {
				transaction.currency = value as Currency;
			}
		}

		this.#storage.createTransaction(transaction);
		this.renderOperationsTable();
	}

	renderOperationsTable(): void {
		this.#historyContainer.replaceChildren(OperationsTable({ transactions: this.#storage.listTransactions() }));
	}

	renderActions(): void {
		this.#actionsContainer.innerHTML = '';
		this.#actionsContainer.append(Modal({ onFormSubmit: this.handleCreateTransaction.bind(this) }));
	}

	render(): void {
		this.renderActions();
		this.renderOperationsTable();
	}
}
