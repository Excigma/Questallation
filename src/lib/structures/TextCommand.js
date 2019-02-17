const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

class TextCommand extends Command {
    constructor(...args) {
        super(...args);

        this.sendText = (message, string) => {
            return message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
                .setTitle(message.command.name.toProperCase())
                .setDescription(string));

        };
        this.convert = (str, data) => {
            let string = str;
            for (const entry of Object.keys(data)) {
                string = string.replaceAll(entry, data[entry]);
            }
            return string;
        };

    }
}

module.exports = TextCommand;
