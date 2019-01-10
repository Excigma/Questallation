module.exports = function (str) {
    var
        r = [],
        c = 0,
        p = 0,
        i = 0;
    while (i < str.length) {
        c = str.charCodeAt(i++);
        if (p) {
            r.push((0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00)).toString(16));
            p = 0;
        } else if (0xD800 <= c && c <= 0xDBFF) {
            p = c;
        } else {
            r.push(c.toString(16));
        }
    }
    return r.join('-');
}
