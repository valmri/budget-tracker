// @ts-expect-error - font files
import "@fontsource-variable/geist-mono";

import "./style.css";

function manageDialogs() {
  const triggers = [
    ...document.querySelectorAll<HTMLButtonElement>("button[data-modal-id]"),
  ];

  if (triggers.length === 0) {
    return;
  }

  for (let trigger of triggers) {
    const dialogId = trigger.dataset["modalId"];

    if (!dialogId) {
      continue;
    }

    const dialog = document.querySelector<HTMLDialogElement>(`#${dialogId}`);

    if (!dialog) {
      continue;
    }

    const closeTrigger =
      dialog.querySelector<HTMLButtonElement>("button[data-close]");

    if (!closeTrigger) {
      continue;
    }

    trigger.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      dialog.showModal();
    });

    closeTrigger.addEventListener("click", (event) => {
      event.preventDefault();
      dialog.close();
    });
  }
}

manageDialogs();
