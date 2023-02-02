export const saveInLocalStorage = ({key, value}) => {
    let isInStorage = localStorage.getItem(key) ? true : false;
    if (isInStorage){
        let valueToJson = JSON.stringify(value);
        localStorage.setItem(key, ...value, valueToJson);
    } else {
        let valueToJson = JSON.stringify(value);
        localStorage.setItem(key, valueToJson);
    }
}