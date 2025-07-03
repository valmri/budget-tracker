import { createElement } from '../renderer/utils';

interface DateRangeProps {
	selectedMonth: { year: number; month: number };
	onPeriodChange: (year: number, month: number) => void;
}

const MONTHS = [
	'Janvier',
	'Février',
	'Mars',
	'Avril',
	'Mai',
	'Juin',
	'Juillet',
	'Août',
	'Septembre',
	'Octobre',
	'Novembre',
	'Décembre',
];

export function DateRange(props: DateRangeProps) {
	const wrapper = createElement(
		'div',
		{
			className:
				'p-6 bg-gradient-to-r from-blue-50 to-white text-gray-800 rounded-xl shadow-md flex flex-col sm:flex-row gap-4 justify-between items-center text-base font-semibold border border-blue-100',
		},
		{},
	);

	const monthSelect = createElement(
		'select',
		{
			className:
				'p-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300',
			name: 'month',
		},
		{
			change: (event) => {
				const selectedMonth = (event.target as HTMLSelectElement).value;
				props.onPeriodChange(props.selectedMonth.year, Number(selectedMonth));
			},
		},
		MONTHS.map((label, index) =>
			createElement(
				'option',
				{
					value: index.toString(),
					selected: index === props.selectedMonth.month,
				},
				{},
				label,
			),
		),
	);

	const resetButton = createElement(
		'button',
		{
			className:
				'p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200',
			type: 'button',
		},
		{
			click: () => {
				props.onPeriodChange(Number.NaN, Number.NaN);
			},
		},
		'Tout afficher',
	);

	const currentYear = new Date().getFullYear();
	const yearsRange = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

	const yearSelect = createElement(
		'select',
		{
			className:
				'p-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300',
			name: 'year',
		},
		{
			change: (event) => {
				const selectedYear = (event.target as HTMLSelectElement).value;
				props.onPeriodChange(Number(selectedYear), props.selectedMonth.month);
			},
		},
		yearsRange.map((year) =>
			createElement(
				'option',
				{
					value: year.toString(),
					selected: year === props.selectedMonth.year,
				},
				{},
				year.toString(),
			),
		),
	);

	wrapper.append('Période :', monthSelect, yearSelect, resetButton);

	return wrapper;
}
