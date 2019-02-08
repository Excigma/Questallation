const { CanvasCommand } = require(`${process.cwd()}/src/index`);

const Jimp = require("jimp");

module.exports = class extends CanvasCommand {
    constructor(...args) {
        super(...args, {
            description: "Pixelate",
            extendedHelp: "A pixelate filter.",
            usage: "[User:user] [Value:integer{0,10}]",
            usageDelim: " ",
            cooldown: 10
        });
    }

    async run(message, [user = message.author, value = 10]) {
        user = await this.client.users.fetch(user.id);
        value *= 2;
        const avatar = await Jimp.read(user.displayAvatarURL({ format: "png", size: 512 }));
        avatar.pixelate(value);
        this.sendCanvas(message, avatar);
    }
};
