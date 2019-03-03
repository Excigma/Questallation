const { TextCommand } = require(`${process.cwd()}/src/index`);


module.exports = class extends TextCommand {
    constructor(...args) {
        super(...args, {
            aliases: ["1337"],
            description: "Makes your text leeted",
            usage: "<Text:str>",
            extendedHelp: "This command |)()35   " | "|-|][5 to text."
        });
    }

    async run(message, [str]) {
        return this.sendText(message, this.convert(str, charMap));
    }
};

const charMap = {
    a: "/-\\\\",
    b: "|o",
    c: "(",
    d: "|)",
    e: "3",
    f: "|=",
    g: "9",
    h: "|-|",
    i: "][",
    j: "\\_|",
    k: "|<",
    l: "|\\_",
    m: "|\\\\/|",
    n: "|\\\\|",
    o: "()",
    p: "|D",
    q: "(,)",
    r: "|Z",
    s: "5",
    t: "'|'",
    u: "|\\_|",
    v: "\\\\/",
    w: "|/\\\\|",
    x: "><",
    y: "\\`/",
    z: "(\\\\)"
};
