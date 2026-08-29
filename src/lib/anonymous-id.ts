const ANONYMOUS_ID_KEY = "serene-anonymous-id";

export function getOrCreateAnonymousId() {
  let id = localStorage.getItem(ANONYMOUS_ID_KEY)?.trim();
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(ANONYMOUS_ID_KEY, id);
  }
  return id;
}
