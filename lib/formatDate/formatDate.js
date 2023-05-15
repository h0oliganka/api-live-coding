export const formatDateToRu = (newDate) => {
    return `${newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()}/${newDate.getMonth() < 10 ? '0' + newDate.getMonth() : newDate.getMonth()}/${newDate.getFullYear()} ${newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours()}:${newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes()}`;
};

export const formatDateToUs = (newDate) => {
    return `${newDate.getMonth() < 10 ? '0' + newDate.getMonth() : newDate.getMonth()}-${newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()}-${newDate.getFullYear()} ${newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours()}:${newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes()}`;
};