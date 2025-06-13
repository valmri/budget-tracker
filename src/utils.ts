import type { Currency } from './models/transaction';

export function formatDateToInput(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

export const dateFormatter = new Intl.DateTimeFormat(undefined, {
	day: '2-digit',
	month: 'long',
	year: 'numeric',
	weekday: 'short'
});

export const currencyFormatter: Record<Currency, Intl.NumberFormat> = {
	EUR: new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency: 'EUR',
		currencyDisplay: 'symbol',
		minimumFractionDigits: 2,
	}),
	USD: new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency: 'USD',
		currencyDisplay: 'symbol',
		minimumFractionDigits: 2,
	}),
}