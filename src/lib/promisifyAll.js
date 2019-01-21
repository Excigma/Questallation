const { promisify: promise } = require('util')
const promisify = (fn) => promise(fn)

module.exports = (obj) => {
    const newObj = Object.getPrototypeOf(obj);
    for (const key of Object.keys(obj).concat(Object.keys(newObj))) {
        if (typeof obj[key] !== 'function') continue;
        obj[`${key}Async`] = promisify(obj[key]);
    }
    return obj;
};