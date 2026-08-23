//On touch devices, react-tooltip's default trigger fires on the first touch, which
//either leaves tooltips stuck open (no hover-out to dismiss) or, worse, swallows a tap
//that was meant for the trigger's own onClick. So on touch we disable the built-in
//trigger entirely (pointing it at events that never fire) and let tapTooltipManager
//drive it manually instead, auto-dismissing itself shortly after so no second tap is
//needed to close it either.
const isTouch = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: none)").matches

const touchTooltipProps = isTouch ? { event: "_tapShow", eventOff: "_tapHide" } : {}

export default touchTooltipProps
