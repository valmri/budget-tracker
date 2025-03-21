const forbiddenAttributes = ['class', 'switch', 'case', 'break', 'continue', 'return'] as const;

export function createElement(
	tagName: keyof HTMLElementTagNameMap,
	attributes: Record<string, string | boolean>,
	events: Partial<Record<keyof HTMLElementEventMap, (...args: Array<any>) => void>>,
	children?: string | Array<HTMLElement> | null | undefined,
): HTMLElement {
	const element = document.createElement(tagName);

	for (let [key, value] of Object.entries(attributes)) {
		if (forbiddenAttributes.includes(key as never)) {
			throw new Error(`Bad attribute used : ${key}`);
		}

		if (value === false) {
			continue;
		}

		if (value === true) {
			element.setAttribute(key, key);

			continue;
		}

		if (key === 'className') {
			element.className = value;

			continue;
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
