const promisify = require("./promisify");


module.exports = (obj, suffix = "Async") => {
    // Appearently some people like to promisify class instances
    const newObj = Object.getPrototypeOf(obj);
    for (const key of Object.keys(obj).concat(Object.keys(newObj))) {
        if (typeof obj[key] !== "function") continue;
        obj[`${key}${suffix}`] = promisify(obj[key]);
    }
    return obj;
};
