const { CanvasCommand } = require(`${process.cwd()}/src/index`);
const Jimp = require("jimp");

module.exports = class extends CanvasCommand {
    constructor(...args) {
        super(...args, {
            description: "Blurs a user's profile picture",
            extendedHelp: ["", "@Excigma#0321"],
            usage: "[User:user] [Value:integer{0,10}]",
            usageDelim: " ",
            cooldown: 10
        });
    }

    async run(message, [user = message.author, value = 10]) {
        user = await this.client.users.fetch(user.id);

        const avatar = await Jimp.read(user.displayAvatarURL({ format: "png", size: 512 }));
        avatar.blur(value);
        this.sendCanvas(message, avatar);
    }
};