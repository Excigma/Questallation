const { TextCommand } = require(`${process.cwd()}/src/index`);


module.exports = class extends TextCommand {
    constructor(...args) {
        super(...args, {
            description: "Makes your text blocked",
            usage: "<Text:str>",
            extendedHelp: "This command converts letters to emojis"
        });
    }

    async run(message, [str]) {
        return this.sendText(message, this.convert(str, charMap));
    }
};

const charMap = {
    a: "​🇦",
    b: "​🇧",
    c: "​🇨",
    d: "​🇩",
    e: "​🇪",
    f: "​🇫",
    g: "​🇬",
    h: "​🇭",
    i: "​🇮",
    j: "​🇯",
    k: "🇰",
    l: "​🇱",
    m: "​🇲",
    n: "​🇳",
    o: "​🇴",
    p: "​🇵",
    q: "​🇶",
    r: "​🇷",
    s: "​🇸",
    t: "​🇹",
    u: "​🇺",
    w: "🇼",
    x: "🇽",
    v: "​​​🇻",
    y: "​🇾",
    z: "​🇿",
    0: "0⃣",
    1: "1⃣",
    2: "2⃣",
    3: "3⃣",
    4: "4⃣",
    5: "5⃣",
    6: "6⃣",
    7: "7⃣",
    8: "8⃣",
    9: "9⃣"
};
