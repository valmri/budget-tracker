// src/components/monthly_view.ts
import { Transaction } from '../models/transaction';

export function groupTransactionsByMonth(transactions: Array<Transaction>) {
	const grouped: Record<string, Array<Transaction>> = {};

	for (const tx of transactions) {
		const rawDate = tx.date instanceof Date ? tx.date : new Date(tx.date);
		if (isNaN(rawDate.getTime())) {
			continue; // skip invalid dates
		}
		const month = rawDate.toISOString().slice(0, 7); // "YYYY-MM"
		if (!grouped[month]) grouped[month] = [];
		grouped[month].push(tx);
	}

	return grouped;
}

export function renderMonthlyView(transactions: Array<Transaction>) {
	const container = document.createElement('div');
	container.id = 'monthly-view';

	const grouped = groupTransactionsByMonth(transactions);
	const sortedMonths = Object.keys(grouped).sort();

	for (const month of sortedMonths) {
		const section = document.createElement('section');
		section.className = 'month-section';

		const monthLabel = new Date(month + '-01').toLocaleDateString('fr-FR', {
			month: 'long',
			year: 'numeric',
		});

		const header = document.createElement('h2');
		header.textContent = monthLabel;

		const list = document.createElement('ul');
		let total = 0;

		for (const tx of grouped[month]) {
			const item = document.createElement('li');
			item.textContent = `${tx.date.toLocaleDateString()} — ${tx.description}: ${tx.amount} €`;
			total += tx.amount;
			list.append(item);
		}

		const footer = document.createElement('p');
		footer.innerHTML = `<strong>Total:</strong> ${total.toFixed(2)} €`;

		section.append(header);
		section.append(list);
		section.append(footer);
		container.append(section);
	}

	return container;
}
