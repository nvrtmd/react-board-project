const saveDataToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export default saveDataToLocalStorage;
