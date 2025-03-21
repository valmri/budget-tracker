export function renderModal() {
	const modalTrigger = document.createElement('button');
	modalTrigger.type = 'button';
	modalTrigger.className =
		'my-6 w-full rounded bg-indigo-600 p-3 text-center text-indigo-50 transition-colors hover:bg-indigo-700';
	modalTrigger.dataset['modalId'] = 'add-operation-modal';
	modalTrigger.textContent = 'Ajouter une opération';

	return `
      <dialog
				id="add-operation-modal"
				class="w-full max-w-lg rounded shadow-sm backdrop:bg-slate-700 backdrop:opacity-30"
			>
				<div class="flex items-center justify-between border-b-2 border-slate-200 p-4">
					<h2 class="text-xl font-semibold text-indigo-700 uppercase">Ajouter une opération</h2>
					<button
						type="button"
						class="rounded bg-indigo-50 p-2 text-indigo-700 transition-colors hover:bg-indigo-100"
						data-close
						aria-label="Fermer"
					>
						<svg class="size-5" aria-hidden="true">
							<use href="#x-mark"></use>
						</svg>
					</button>
				</div>

				<form class="grid gap-4 p-4">
					<div class="grid gap-1">
						<label for="operation-date">Date</label>
						<input
							type="datetime-local"
							name="operation-date"
							id="operation-date"
							class="rounded border border-slate-300 p-3"
							required
						/>
					</div>

					<div class="grid gap-1">
						<label for="operation-description">Description</label>
						<input
							type="text"
							id="operation-description"
							name="operation-description"
							class="rounded border border-slate-300 p-3"
							required
						/>
					</div>

					<fieldset>
						<legend class="mb-1">Type d'opération</legend>

						<div class="flex items-center gap-2">
							<label class="flex grow items-center gap-3 rounded border border-slate-300 px-4 py-3">
								<input type="radio" name="operation-type" id="operation-type--credit" required />
								<span>Crédit</span>
							</label>

							<label class="flex grow items-center gap-3 rounded border border-slate-300 px-4 py-3">
								<input type="radio" name="operation-type" id="operation-type--debit" required />
								<span>Débit</span>
							</label>
						</div>
					</fieldset>

					<div class="grid gap-1">
						<label for="operation-amount">Montant</label>
						<input
							type="number"
							id="operation-amount"
							name="operation-amount"
							class="rounded border border-slate-300 p-3 text-right"
							required
						/>
					</div>

					<div class="flex items-center gap-2">
						<button
							type="reset"
							class="grow rounded bg-amber-100 p-3 text-center text-amber-700 transition-colors hover:bg-amber-200"
						>
							Effacer
						</button>
						<button
							type="submit"
							class="grow rounded bg-indigo-100 p-3 text-center text-indigo-700 transition-colors hover:bg-indigo-200"
						>
							Ajouter
						</button>
					</div>
				</form>
			</dialog>`;
}
