const { TextCommand } = require(`${process.cwd()}/src/index`);

const converter = (string) => {
    const chars = string.toUpperCase().split("");
    for (let i = 0; i < chars.length; i += 2) {
        chars[i] = chars[i].toLowerCase();
    }
    return chars.join("");
};


module.exports = class extends TextCommand {
    constructor(...args) {
        super(...args, {
            description: "Alternates your case",
            usage: "<Text:str>",
            extendedHelp: "This command is based on the pOpUlAr MoCkInG meme."
        });
    }

    async run(message, [str]) {
        return this.sendText(message, converter(str));

    }
};
