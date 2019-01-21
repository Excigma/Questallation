const { Command } = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["choice", "pick", "decide"],
            description: "Makes a decision for you when you're undecisive",
            extendedHelp: ["Sleep, Mown lawn, tidy room, etc", "Cola, pepsi, juice"],
            usage: "<choices:str> [...]",
            usageDelim: ", "
        });
    }

    async run(message, [...choices]) {
        return message.sendEmbed({
            title: "Choice",
            description: choices.length === 1 ?
                "You gave me one option, what do you think?" : choices.random()
        });
    }
};