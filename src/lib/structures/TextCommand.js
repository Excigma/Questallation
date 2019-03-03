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
        this.convert = (str, object) => {
            let newsentence = "";
            let char;
            for (var i = 0; i <= str.length; i++) {
                char = str.charAt(i);
                newsentence += object[char] || object[char.toLowerCase()] || char;
            }
            return newsentence;
        };
    }
}

module.exports = TextCommand;
