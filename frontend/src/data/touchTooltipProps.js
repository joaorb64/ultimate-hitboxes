//On touch devices there's no hover-out to dismiss a tooltip, so hover-triggered tooltips get stuck open.
//Switch those devices to tap-to-open / tap-elsewhere-to-close instead of leaving tooltip content unreachable.
const isTouch = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: none)").matches

const touchTooltipProps = isTouch ? { event: "click", globalEventOff: "click" } : {}

export default touchTooltipProps
