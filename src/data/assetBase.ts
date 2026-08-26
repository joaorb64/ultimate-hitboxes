export const assetBase = window.location.hostname.endsWith("github.io")
  ? `/${window.location.pathname.split("/").filter(Boolean)[0] || ""}`
  : "";
