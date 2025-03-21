export function renderHeading() {
	const heading = document.createElement('h1');
	heading.classList.add('text-2xl');
	heading.textContent = 'Budget Tracker';

	return heading;
}
