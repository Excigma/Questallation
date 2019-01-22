const { AnimalCommand, MessageEmbed } = require(`${process.cwd()}/src/index`);

module.exports = class extends AnimalCommand {
    constructor(...args) {
        super(...args, {
            aliases: ["woof", "doggo"],
            description: "Sends a cute dog picture"
        });
    }

    async run(message) {
        const body = await this.getPicture("https://dog.ceo/api/breeds/image/random").then(res => res.json());
        message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
            .setTitle("Dog")
            .setImage(body.message));
    }
}