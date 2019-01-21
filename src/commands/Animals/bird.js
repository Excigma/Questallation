const { AnimalCommand } = require(`${process.cwd()}/src/index`);
const { MessageEmbed } = require("discord.js");

module.exports = class extends AnimalCommand {
    constructor(...args) {
        super(...args, {
            aliases: ["birb"],
            description: "Sends a cute bird picture"
        });
    }

    async run(message) {
        const body = await this.getPicture("http://random.birb.pw/tweet/").then(res => res.text());
        message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
            .setTitle("Bird")
            .setImage(`https://random.birb.pw/img/${body}`));
    }
}