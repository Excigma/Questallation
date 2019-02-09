const { TextCommand } = require(`${process.cwd()}/src/index`);
const binary = (string) => string.split("").map((char) => { return char.charCodeAt(0).toString(2); }).join(" ");


module.exports = class extends TextCommand {
    constructor(...args) {
        super(...args, {
            description: "Makes binary from words.",
            usage: "<Text:str>",
            extendedHelp: "This command changes a string to binary."
        });
    }

    async run(msg, [str]) {
        this.sendTest(binary(str));
    }
};
