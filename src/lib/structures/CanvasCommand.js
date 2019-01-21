const { Command } = require("klasa");
const { MessageEmbed, MessageAttachment } = require("discord.js");

class CanvasCommand extends Command {
    constructor(...args) {
        super(...args);
        this.sendCanvas = async(message, canvas) => {
            const buffer = await canvas.getBufferAsync("image/png")
            return message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
                .setTitle(message.command.name.toProperCase())
                .attachFiles([new MessageAttachment(buffer, `${message.command.name.toProperCase()}.png`)])
                .setImage(`attachment://${message.command.name.toProperCase()}.png`))
        }
    }
}

module.exports = CanvasCommand;