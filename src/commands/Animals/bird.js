const { AnimalCommand, MessageEmbed } = require(`${process.cwd()}/src/index`);

module.exports = class extends AnimalCommand {
    constructor(...args) {
        super(...args, {
            aliases: ["birb"],
            description: "Sends a cute bird picture"
        });
    }

    async run(message) {
        const body = await this.getPicture("https://some-random-api.ml/birbimg").then(res => res.json());
        message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
            .setTitle("Bird")
            .setImage(body.link));
    }
};
