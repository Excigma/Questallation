const { CanvasCommand } = require(`${process.cwd()}/src/index`);
const Jimp = require("jimp");

module.exports = class extends CanvasCommand {
    constructor(...args) {
        super(...args, {
            description: "Changes the brightness of a user's profile picture",
            extendedHelp: "A brightness filter.",
            usage: "[User:user] [Value:integer{0,10}]",
            usageDelim: " ",
            cooldown: 10
        });
    }

    async run(message, [user = message.author, value = 10]) {
        user = await this.client.users.fetch(user.id);

        value = (value - 5) / 5;
        const avatar = await Jimp.read(user.displayAvatarURL({ format: "png", size: 512 }));
        avatar.brightness(value);
        this.sendCanvas(message, avatar);
    }
};