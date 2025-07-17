export function getHost() {
    const url = new URL(window.location.href);
    return url.searchParams.get("host");
  }
  