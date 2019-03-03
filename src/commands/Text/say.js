const { TextCommand } = require(`${process.cwd()}/src/index`);


module.exports = class extends TextCommand {
    constructor(...args) {
        super(...args, {
            description: "Sends text into an embed",
            usage: "<Text:str>",
            extendedHelp: "This command sends text in an embed"
        });
    }

    async run(message, [str]) {
        return this.sendText(message, str);
    }
};
