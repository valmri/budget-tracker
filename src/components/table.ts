export function renderOperationHistory() {
	return `<table class="w-full rounded bg-white p-4 shadow">
				<thead class="bg-indigo-50 text-indigo-600">
					<tr>
						<th class="p-3 text-left font-medium">Date</th>
						<th class="p-3 text-left font-medium">Description</th>
						<th class="p-3 text-right font-medium">Crédit</th>
						<th class="p-3 text-right font-medium">Débit</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="p-3 text-left">Dim 10 fév 22:02</td>
						<td class="p-3 text-left">Netflix</td>
						<td class="p-3 text-right"></td>
						<td class="p-3 text-right">5,99 €</td>
					</tr>
					<tr>
						<td class="p-3 text-left">Dim 10 fév 22:02</td>
						<td class="p-3 text-left">CAF</td>
						<td class="p-3 text-right">9 482,67 €</td>
						<td class="p-3 text-right"></td>
					</tr>
				</tbody>
				<tfoot class="bg-indigo-50 font-bold text-indigo-600">
					<tr>
						<td class="p-3 text-right uppercase" colspan="2">Total mensuel</td>
						<td class="p-3 text-right">Total crédit</td>
						<td class="p-3 text-right">Total débit</td>
					</tr>
				</tfoot>
			</table>`;
}
