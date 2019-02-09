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
        this.convert = (string, object) => string.replace(new RegExp(`/[${object.values()}]/`, "gi"), match => object[match]);
    }
}

module.exports = TextCommand;
