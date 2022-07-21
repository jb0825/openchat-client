const storage = new Map();

export const useStorage = (key, value) => {
  if (key && value) storage.set(key, value);

  const setStorage = (key, value) => storage.set(key, value);
  const getStorage = (key) => {
    return storage.get(key);
  };

  return { setStorage, getStorage };
};
