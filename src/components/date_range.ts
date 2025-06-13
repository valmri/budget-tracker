import { createElement } from '../renderer/utils';

interface DateRangeProps {
	selectedMonth: { year: number; month: number };
	onPeriodChange: (year: number, month: number) => void;
}

export function DateRange(props: DateRangeProps) {
	return createElement('div', { className: 'p-4 bg-rose-200 text-rose-700 rounded text-center text-xl font-bold' }, {}, 'MAYBE DATE RANGE COMPONENT HERE');
}