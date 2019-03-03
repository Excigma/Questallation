const { TextCommand } = require(`${process.cwd()}/src/index`);

const converter = (string) => {
    const finalPhrase = [];
    string.split(" ").forEach(word => {
        if (Math.random() > 0.7) finalPhrase.push(`${word.charAt(0)}-${word}`);
        else finalPhrase.push(word);
        if (Math.random() > 0.99) finalPhrase.push("_OwO, what's this?_");
    });
    return finalPhrase.join(" ").replaceAll("l", "w").replaceAll("L", "W").replaceAll("r", "w").replaceAll("R", "W") + [" x3", " :3", " owo", " OwO", " OWO", " O.o", " Uwu"].random();
};


module.exports = class extends TextCommand {
    constructor(...args) {
        super(...args, {
            description: "Owo what's this",
            usage: "<Text:str>",
            extendedHelp: "Convert your boring English sentences into Engwish."
        });
    }

    async run(message, [str]) {
        return this.sendText(message, converter(str));
    }
};
