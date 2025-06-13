import type { Transaction } from '../models/transaction';

import { createElement } from '../renderer/utils';

interface OperationsTableProps {
	transactions: Array<Transaction>;
}

export function OperationsTable(props: OperationsTableProps) {
	return createElement('table', { className: 'w-full rounded bg-white p-4 shadow' }, {}, [
		createElement('thead', { className: 'bg-indigo-50 text-indigo-600' }, {}, [
			createElement('tr', {}, {}, [
				createElement('th', { className: 'p-3 text-left font-medium' }, {}, 'Date'),
				createElement('th', { className: 'p-3 text-left font-medium' }, {}, 'Description'),
				createElement('th', { className: 'p-3 text-right font-medium' }, {}, 'Crédit'),
				createElement('th', { className: 'p-3 text-right font-medium' }, {}, 'Débit'),
				createElement('th', {}, {}),
			])
		]),
		createElement('tbody', {}, {}, props.transactions.map((transaction) => (
			createElement('tr', {}, {}, [
				createElement('td', { className: 'p-3 text-left' }, {}, transaction.operatedAt.toISOString()),
				createElement('td', { className: 'p-3 text-left' }, {}, transaction.label),
				createElement('td', { className: 'p-3 text-right' }, {}, transaction.type === 'income' ? `${transaction.amount} €` : ''),
				createElement('td', { className: 'p-3 text-right' }, {}, transaction.type === 'expense' ? `${transaction.amount} €` : ''),
				createElement('td', {}, {}, 'Actions')
			])
		))),
	])
}
