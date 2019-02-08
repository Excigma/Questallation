const { CanvasCommand } = require(`${process.cwd()}/src/index`);

const Jimp = require("jimp");

module.exports = class extends CanvasCommand {
    constructor(...args) {
        super(...args, {
            description: "Inverts the colors",
            extendedHelp: "Inverts all the colors in your avatar.",
            usage: "[User:user]",
            usageDelim: " ",
            cooldown: 10
        });
    }

    async run(message, [user = message.author]) {
        user = await this.client.users.fetch(user.id);

        const avatar = await Jimp.read(user.displayAvatarURL({ format: "png", size: 512 }));
        avatar.invert();
        this.sendCanvas(message, avatar);
    }
};
