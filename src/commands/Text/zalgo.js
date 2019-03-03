const { TextCommand } = require(`${process.cwd()}/src/index`);


module.exports = class extends TextCommand {
    constructor(...args) {
        super(...args, {
            description: "ZALGOOOO",
            usage: "<Text:str>",
            extendedHelp: "This command makes your text be zalgo"
        });
    }

    async run(message, [str]) {
        this.sendText(message, this.convert(str, charMap));
    }
};

const charMap = {
    a: "ạ̫͓ͮ͗̅̉",
    b: "b̫̰̝͈̈́",
    c: "c̮̲̫̪̺̿ͥ",
    d: "d̥͔͖̝͚͈̘̾̏",
    e: "ȅ̬̲̣̞̹̈ͫͮ̅ͥ̈́",
    f: "͇̺͙͓̱̲̮̍̔ͧ̆͛̚f̈́",
    g: "g͇",
    h: "ḣ̻̣͍̺͚̮̻̓̀ͣ̈́ͬ",
    i: "͈͙̺̩͙͛̉ͭ̐̆̚i͍͕̮͓̲̯",
    j: "j̖ͮ̎̀̎͂",
    k: "ḱ̟̜͈͎͓̲ͦͦͯ",
    l: "͕̠͉ͯl̐",
    m: "m̗̻̥̖͎͓͈̏̊ͫ̇ͨ",
    n: "ṇ̦̲ͫͭ̇͒̐",
    o: "õ͚̺̬̠ͬ",
    p: "ṗ̜͊͂",
    q: "q̝͓͈̤͖ͤͥ͑ͬ",
    r: "r̮͈̺ͪ",
    s: "s̬ͦ͋",
    t: "̬͋t̙̺ͫ",
    v: "ͅv̞͉̤ͧ́͗͗̚ͅͅ",
    u: "̹ǔ͖̻̭͚ͥ͌͗̊͊͂",
    w: "wͬ́̅̅͒̐",
    y: "v̞ͧ́͗͗̚ͅ",
    z: "z̬̈̆̎ͦͯ͒̈́",
    ".": "wͬ́̅̅͒̐",
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
