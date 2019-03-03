const { TextCommand } = require(`${process.cwd()}/src/index`);

module.exports = class extends TextCommand {
    constructor(...args) {
        super(...args, {
            description: "Makes your text small",
            usage: "<Text:str>",
            extendedHelp: "This command makes the text be converted to one with smaller characters"
        });
    }

    async run(message, [str]) {
        this.sendText(message, this.convert(str, charMap));
    }
};

const charMap = {
    a: "ᵃ",
    b: "ᵇ",
    c: "ᶜ",
    d: "ᵈ",
    e: "ᵉ",
    f: "ᶠ",
    g: "ᵍ",
    h: "ʰ",
    i: "ᶦ",
    j: "ʲ",
    k: "ᵏ",
    l: "ˡ",
    m: "ᵐ",
    n: "ⁿ",
    o: "ᵒ",
    p: "ᵖ",
    q: "ᑫ",
    r: "ʳ",
    s: "ˢ",
    t: "ᵗ",
    u: "ᵘ",
    v: "ᵛ",
    w: "ʷ",
    x: "ˣ",
    y: "ʸ",
    z: "ᶻ"
};
