const { TextCommand } = require(`${process.cwd()}/src/index`);


module.exports = class extends TextCommand {
    constructor(...args) {
        super(...args, {
            description: "Makes your text flipped",
            usage: "<Text:str>",
            extendedHelp: "This command p o ǝ s   ʇ ɥ ı s   ʇ o   ʇ ǝ x ʇ"
        });
    }

    async run(message, [str]) {
        return this.sendText(message, this.convert(str, charMap));
    }
};

const charMap = {
    a: "\u0250",
    b: "q",
    c: "\u0254",
    d: "p",
    e: "\u01DD",
    f: "\u025F",
    g: "\u0183",
    h: "\u0265",
    i: "\u0131",
    j: "\u027E",
    k: "\u029E",
    // l : '\u0283',
    m: "\u026F",
    n: "u",
    r: "\u0279",
    t: "\u0287",
    v: "\u028C",
    w: "\u028D",
    y: "\u028E",
    ".": "\u02D9",
    "[": "]",
    "(": ")",
    "{": "}",
    "?": "\u00BF",
    "!": "\u00A1",
    "'": ",",
    "<": ">",
    _: "\u203E",
    "": "\u061B",
    "\u203F": "\u2040",
    "\u2045": "\u2046",
    "\u2234": "\u2235",
    "\r": "\n"
};
