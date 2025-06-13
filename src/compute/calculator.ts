import type { StorageInterface } from '../storage/storage_interface';
import type { ChangeRateConverter } from './change_rate_converter';

import { Balance } from '../components/balance';
import { Button } from '../components/button';
import { Modal } from '../components/modal';
import { SalaryForm } from '../components/salary';
import { OperationsTable } from '../components/table';
import { type Currency, Transaction, type TransactionType } from '../models/transaction';

interface CalculatorProps {
	storage: StorageInterface;
	changeRateConverter: ChangeRateConverter;
	dom: {
		actions: HTMLElement;
		history: HTMLElement;
		balance: HTMLElement;
		salary: HTMLElement;
	};
}

export class Calculator {
	readonly #storage: StorageInterface;
	readonly #changeRateConverter: ChangeRateConverter;
	readonly #actionsContainer: HTMLElement;
	readonly #historyContainer: HTMLElement;
	readonly #balanceContainer: HTMLElement;
	readonly #salaryContainer: HTMLElement;

	constructor(props: CalculatorProps) {
		this.#storage = props.storage;
		this.#changeRateConverter = props.changeRateConverter;
		this.#actionsContainer = props.dom.actions;
		this.#historyContainer = props.dom.history;
		this.#balanceContainer = props.dom.balance;
		this.#salaryContainer = props.dom.salary;
	}

	get storage(): StorageInterface {
		return this.#storage;
	}

	get changeRateConverter(): ChangeRateConverter {
		return this.#changeRateConverter;
	}

	compute() {
		const output: {
			expense: Record<Currency, number>;
			income: Record<Currency, number>;
			balance: Record<Currency, number>;
		} = {
			expense: { EUR: 0, USD: 0 },
			income: { EUR: 0, USD: 0 },
			balance: { EUR: 0, USD: 0 },
		};

		output.balance.EUR = this.#storage.getSalary();
		output.balance.USD = this.#changeRateConverter.convert(this.#storage.getSalary(), 'EUR');

		for (const transaction of this.#storage.listTransactions()) {
			output[transaction.type][transaction.currency] = (output[transaction.type][transaction.currency]) + transaction.amount;

			const otherCurrency = transaction.currency === 'EUR' ? 'USD' : 'EUR';
			const convertedAmount = this.#changeRateConverter.convert(transaction.amount, transaction.currency);
			output[transaction.type][otherCurrency] = (output[transaction.type][otherCurrency]) + convertedAmount;

			output.balance[transaction.currency] = transaction.type === 'expense'
				? (output.balance[transaction.currency]) - transaction.amount
				: (output.balance[transaction.currency]) + transaction.amount;

			output.balance[otherCurrency] = transaction.type === 'expense'
				? (output.balance[otherCurrency]) - convertedAmount
				: (output.balance[otherCurrency]) + convertedAmount;
		}

		return output;
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
		this.renderBalance();
	}

	handleTransactionUpdate(values: FormData) {
		const payload = {
			label: values.get('operation-description') as string,
			type: values.get('operation-type') as TransactionType,
			amount: Number(values.get('operation-amount') as string),
			currency: values.get('operation-currency') as Currency,
			operatedAt: new Date(values.get('operation-date') as string),
		} satisfies Partial<Transaction>;

		this.#storage.updateTransaction(values.get('operation-id') as string, payload);
		this.renderOperationsTable();
		this.renderBalance();
	}

	handleTransactionDelete(transactionId: string): void {
		if (window.confirm('Êtes-vous sûr de vouloir supprimer cette opération ?')) {
			this.#storage.deleteTransaction(transactionId);
			this.renderOperationsTable();
			this.renderBalance();
		}
	}

	handleSalaryUpdate(salary: number): void {
		this.#storage.setSalary(salary);
		this.renderBalance();
	}

	renderOperationsTable(): void {
		this.#historyContainer.replaceChildren(OperationsTable({
			transactions: this.#storage.listTransactions(),
			onTransactionUpdate: this.handleTransactionUpdate.bind(this),
			onTransactionDelete: this.handleTransactionDelete.bind(this),
		}));
	}

	renderActions(): void {
		this.#actionsContainer.innerHTML = '';
		this.#actionsContainer.append(Modal({
			id: 'add-transaction-modal',
			modalTitle: 'Ajouter une opération',
			onFormSubmit: this.handleCreateTransaction.bind(this),
			trigger: Button({ variant: 'normal', action: 'primary', content: 'Ajouter une opération', className: 'w-full' }),
		}));
	}

	renderBalance(): void {
		const balance = this.compute();
		console.log({ balance })
		this.#balanceContainer.replaceChildren(Balance({
			totalBalance: balance.balance,
			totalExpenses: balance.expense,
			totalIncome: balance.income,
		}));
	}

	renderSalary(): void {
		this.#salaryContainer.replaceChildren(
			SalaryForm({
				value: this.#storage.getSalary(),
				onUpdate: this.handleSalaryUpdate.bind(this),
			}),
		);
	}

	render(): void {
		this.renderActions();
		this.renderSalary();
		this.renderOperationsTable();
		this.renderBalance();
	}
}
