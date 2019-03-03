const { TextCommand } = require(`${process.cwd()}/src/index`);

const converter = (str) => Array(str.length).fill(true).map((_, i) => !i || i === str.length - 1 ? !i ? str.split("").join(" ") : str.split("").reverse().join(" ") : str[i] + " ".repeat(str.length * 2 - 3) + str[str.length - 1 - i]).join("\n");

module.exports = class extends TextCommand {
    constructor(...args) {
        super(...args, {
            aliases: ["box"],
            description: "Makes your text into a box",
            usage: "<Text:str{1,15}>",
            extendedHelp: "This command puts what you send into a box"
        });
    }

    async run(message, [str]) {
        return this.sendText(message, `\`\`\`${converter(str)}\`\`\``);

    }
};
