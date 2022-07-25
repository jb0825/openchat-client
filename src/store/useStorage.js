const storage = new Map();

export const useStorage = (key, value) => {
  if (key && value) storage.set(key, value);

  const set = (key, value) => storage.set(key, value);
  const get = (key) => {
    return storage.get(key);
  };

  return { set, get };
};
