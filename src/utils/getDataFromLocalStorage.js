const getDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};
export default getDataFromLocalStorage;
