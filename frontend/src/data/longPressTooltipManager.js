import ReactTooltip from "react-tooltip"

//Material's touch pattern for tooltips: a long press reveals them, and they disappear on
//their own shortly after, without needing a second tap to dismiss.
const LONG_PRESS_MS = 450
const AUTO_HIDE_MS = 2000
//A real finger never holds perfectly still - a few pixels of drift is normal and shouldn't
//be treated as "the user is scrolling/dragging, cancel the long press"
const MOVE_CANCEL_THRESHOLD = 12

let pressTimer = null
let hideTimer = null
let startX = 0
let startY = 0
let initialized = false

function clearPressTimer() {
	if (pressTimer) {
		clearTimeout(pressTimer)
		pressTimer = null
	}
}

function findTrigger(target) {
	return target instanceof Element ? target.closest("[data-tip]") : null
}

//Registers a single set of document-level listeners so every current and future
//long-press-enabled tooltip trigger is handled without per-element wiring
export function initLongPressTooltips() {
	if (initialized || typeof document === "undefined") {
		return
	}
	initialized = true

	document.addEventListener("touchstart", (e) => {
		const trigger = findTrigger(e.target)
		clearPressTimer()
		if (!trigger) {
			return
		}
		const touch = e.touches[0]
		startX = touch.clientX
		startY = touch.clientY
		pressTimer = setTimeout(() => {
			ReactTooltip.show(trigger)
			if (hideTimer) {
				clearTimeout(hideTimer)
			}
			hideTimer = setTimeout(() => {
				ReactTooltip.hide(trigger)
			}, AUTO_HIDE_MS)
		}, LONG_PRESS_MS)
	}, { passive: true })

	document.addEventListener("touchmove", (e) => {
		if (!pressTimer) {
			return
		}
		const touch = e.touches[0]
		if (Math.abs(touch.clientX - startX) > MOVE_CANCEL_THRESHOLD || Math.abs(touch.clientY - startY) > MOVE_CANCEL_THRESHOLD) {
			clearPressTimer()
		}
	}, { passive: true })

	document.addEventListener("touchend", clearPressTimer, { passive: true })
	document.addEventListener("touchcancel", clearPressTimer, { passive: true })
}
