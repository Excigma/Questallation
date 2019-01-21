const { AnimalCommand } = require(`${process.cwd()}/src/index`);
const { MessageEmbed } = require("discord.js");

module.exports = class extends AnimalCommand {
    constructor(...args) {
        super(...args, {
            aliases: ["rabbit"],
            description: "Sends a cute bunny picture"
        });
    }

    async run(message) {
        const body = await this.getPicture("https://api.bunnies.io/v2/loop/random/?media=gif,png").then(res => res.json());
        message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
            .setTitle("Bunny")
            .setImage(body.media.poster));
    }
}