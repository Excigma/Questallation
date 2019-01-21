const { AnimalCommand } = require(`${process.cwd()}/src/index`);
const { MessageEmbed } = require("discord.js");

module.exports = class extends AnimalCommand {
    constructor(...args) {
        super(...args, {
            description: "Sends a cute owl picture"
        });
    }

    async run(message) {
        const body = await this.getPicture("http://pics.floofybot.moe/owl").then(res => res.json());;
        message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
            .setTitle("Owl")
            .setImage(body.image.replace(".gifv", ".gif")));
    }
}