const isTouchDevice = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: none)").matches

export default isTouchDevice
