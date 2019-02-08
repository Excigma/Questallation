const { AnimalCommand, MessageEmbed } = require(`${process.cwd()}/src/index`);
module.exports = class extends AnimalCommand {
    constructor(...args) {
        super(...args, {
            aliases: ["meow", "kitty"],
            description: "Sends a cute cat picture"
        });
    }

    async run(message) {
        const body = await this.getPicture("http://aws.random.cat/meow").then(res => res.json());
        message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
            .setTitle("Cat")
            .setImage(body.file));
    }
};
