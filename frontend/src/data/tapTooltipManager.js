import ReactTooltip from "react-tooltip"

//Table tooltips (headers, angle compass, hitbox detail labels) show on a plain tap and
//disappear on their own shortly after - no long press, no second tap needed to dismiss.
const AUTO_HIDE_MS = 2000

let hideTimer = null
let initialized = false

function findTrigger(target) {
	return target instanceof Element ? target.closest("[data-tip]") : null
}

//Registers a single document-level listener so every current and future tap-tooltip
//trigger is handled without per-element wiring
export function initTapTooltips() {
	if (initialized || typeof document === "undefined") {
		return
	}
	initialized = true

	document.addEventListener("touchstart", (e) => {
		const trigger = findTrigger(e.target)
		if (!trigger) {
			return
		}
		ReactTooltip.show(trigger)
		if (hideTimer) {
			clearTimeout(hideTimer)
		}
		hideTimer = setTimeout(() => {
			ReactTooltip.hide(trigger)
		}, AUTO_HIDE_MS)
	}, { passive: true })
}
