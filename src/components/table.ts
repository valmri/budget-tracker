import type { Transaction } from '../models/transaction';

import { createElement } from '../renderer/utils';
import { currencyFormatter, dateFormatter } from '../utils';
import { Button } from './button';
import { Modal } from './modal';

interface OperationsTableProps {
	transactions: Array<Transaction>;

	onTransactionUpdate(values: FormData): void;

	onTransactionDelete(transactionId: string): void;
}

export function OperationsTable(props: OperationsTableProps) {
	return createElement('table', { className: 'w-full rounded bg-white shadow' }, {}, [
		createElement('thead', { className: 'bg-indigo-50 text-indigo-600' }, {}, [
			createElement('tr', {}, {}, [
				createElement('th', { className: 'p-3 text-left font-medium' }, {}, 'Date'),
				createElement('th', { className: 'p-3 text-left font-medium' }, {}, 'Description'),
				createElement('th', { className: 'p-3 text-right font-medium' }, {}, 'Crédit'),
				createElement('th', { className: 'p-3 text-right font-medium' }, {}, 'Débit'),
				createElement('th', {}, {}),
			]),
		]),
		createElement(
			'tbody',
			{},
			{},
			props.transactions.map((transaction) =>
				createElement('tr', {}, {}, [
					createElement(
						'td',
						{ className: 'px-3 py-2 text-left' },
						{},
						dateFormatter.format(transaction.operatedAt),
					),
					createElement('td', { className: 'px-3 py-2 text-left' }, {}, transaction.label),
					createElement(
						'td',
						{ className: 'px-3 py-2 text-right' },
						{},
						transaction.type === 'income'
							? `${currencyFormatter[transaction.currency].format(transaction.amount)}`
							: '',
					),
					createElement(
						'td',
						{ className: 'px-3 py-2 text-right' },
						{},
						transaction.type === 'expense'
							? `${currencyFormatter[transaction.currency].format(transaction.amount)}`
							: '',
					),
					createElement(
						'td',
						{ className: 'p-2 flex gap-2 items-center justify-end' },
						{},
						[
							Modal({
								id: `update-transaction-${transaction.id}`,
								modalTitle: "Modifier l'opération",
								onFormSubmit: (values) => props.onTransactionUpdate(values),
								trigger: Button({ variant: 'square', action: 'secondary', icon: 'edit' }),
								transaction,
							}),
							Button({
								variant: 'square',
								action: 'danger',
								icon: 'delete',
								events: { click: () => props.onTransactionDelete(transaction.id) },
							}),
						],
					),
				]),
			),
		),
	]);
}
