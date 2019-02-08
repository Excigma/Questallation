const { Command } = require("klasa");

const converter = (str) => {
    var string = "";
    str.split("").forEach(char => {
        if (charMap[char]) string += charMap[char];
        else string += char;
    });
    return string;
};

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["1337"],
            description: "Makes your text small",
            usage: "<Text:str>",
            extendedHelp: "This command makes the text be converted to one with smaller characters"
        });
    }

    async run(message, [str]) {
        message.sendEmbed({
            title: "Small",
            color: 0x7289DA,
            author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL()
            },
            description: converter(str)
        });

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
