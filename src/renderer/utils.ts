const forbiddenAttributes = [
	'class',
	'switch',
	'case',
	'break',
	'continue',
	'return',
	'for',
	'foreach',
] as const;

export function createElement<Tag extends keyof HTMLElementTagNameMap>(
	tagName: Tag,
	attributes: Record<string, string | boolean>,
	events: Partial<Record<keyof HTMLElementEventMap, (...args: Array<any>) => void>>,
	children?: string | Array<Element|DocumentFragment|null|undefined> | null | undefined,
): HTMLElementTagNameMap[Tag] {
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

		if (key === 'htmlFor') {
			element.setAttribute('for', value);

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
			if (child === null || child === undefined) {
				continue;
			}

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

export function createSVGElement<Tag extends keyof SVGElementTagNameMap>(
	tagName: Tag,
	attributes: Record<string, string | boolean>,
	events: Partial<Record<keyof HTMLElementEventMap, (...args: Array<any>) => void>>,
	children?: string | Array<Element> | null | undefined,
): SVGElementTagNameMap[Tag] {
	const element = document.createElementNS('http://www.w3.org/2000/svg', tagName);

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
			element.classList.add(...value.split(' '));

			continue;
		}

		if (key === 'htmlFor') {
			element.setAttribute('for', value);

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
