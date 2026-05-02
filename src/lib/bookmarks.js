// Tiny localStorage-backed bookmarks store with a pubsub so components stay in sync.

const KEY = "vu:bookmarks:v1";
const listeners = new Set();

const read = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

const write = (list) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
  listeners.forEach((fn) => fn(list));
};

export const getBookmarks = () => read();

export const isBookmarked = (id) => read().some((b) => b.id === id);

export const toggleBookmark = (item) => {
  const list = read();
  const exists = list.find((b) => b.id === item.id);
  const next = exists
    ? list.filter((b) => b.id !== item.id)
    : [{ ...item, savedAt: Date.now() }, ...list];
  write(next);
  return !exists;
};

export const removeBookmark = (id) => {
  write(read().filter((b) => b.id !== id));
};

export const subscribeBookmarks = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
