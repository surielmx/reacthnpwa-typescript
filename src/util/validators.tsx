export const isValidObject = (obj: {} = {}) => {
    return (
        obj &&
        typeof obj === 'object' &&
        obj.constructor === Object &&
        Object.keys(obj).length !== 0
    );
};
export const validatePage = (page: number = 1, total: number = 0) => {
    let validPage = !isNaN(page);

    if (validPage && total) {
        return page <= total;
    }
    return validPage;
};
export const validateItem = (item: string = '') => {
    let isValidItem = !isNaN(Number(item));
    let validItem = isValidItem && item.length === 8;
    return validItem;
};