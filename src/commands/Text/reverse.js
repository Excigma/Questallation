const { TextCommand } = require(`${process.cwd()}/src/index`);


module.exports = class extends TextCommand {
    constructor(...args) {
        super(...args, {
            description: "Alternates your case",
            usage: "<Text:str>",
            extendedHelp: "This command is reverses the order of your text."
        });
    }

    async run(message, [str]) {
        return this.sendText(message, str.split("").reverse().join(""));

    }
};
