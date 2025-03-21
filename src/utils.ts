export function createElement(
	tagName: keyof HTMLElementTagNameMap,
	attributes: Record<string, string | boolean>,
	events: Partial<Record<keyof HTMLElementEventMap, (...args: Array<any>) => void>>,
	children?: string | Array<HTMLElement> | null | undefined,
): HTMLElement {
	const element = document.createElement(tagName);

	for (let [key, value] of Object.entries(attributes)) {
		if (value === true) {
			element.setAttribute(key, key);
		}

		if (typeof value === 'string') {
			element.setAttribute(key, value);
		}
	}

	for (let [eventKey, eventFn] of Object.entries(events)) {
		element.addEventListener(eventKey, eventFn);
	}

	if (!children) {
		return element;
	}

	if (Array.isArray(children)) {
		for (let child of children) {
			element.append(child);
		}

		return element;
	}

	if (typeof children === 'string') {
		element.textContent = children;

		return element;
	}

	throw new TypeError('Unexpected child');
}

createElement(
	'details',
	{ open: true, className: 'coucou' },
	{ click: (event) => console.log({ event }) },
	'mon contenu',
);
