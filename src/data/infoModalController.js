//A tiny pub-sub so any component can open the single, always-mounted InfoModal without
//prop-drilling a setter down through the table/detail-modal component trees.
let listener = null

export function registerInfoModalListener(fn) {
	listener = fn
}

export function showInfoModal(title, text) {
	if (listener) {
		listener({ title, text })
	}
}
