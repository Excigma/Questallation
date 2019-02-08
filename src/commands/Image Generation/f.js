const { CanvasCommand } = require(`${process.cwd()}/src/index`);
const Jimp = require("jimp");

module.exports = class extends CanvasCommand {
    constructor(...args) {
        super(...args, {
            description: "Press F.",
            extendedHelp: "Press F to pay respect.",
            usage: "[User:user]",
            aliases: ["respect"],
            cooldown: 10,
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS", "ADD_REACTIONS"]
        });
    }

    async run(message, [user = message.author]) {
        user = await this.client.users.fetch(user.id);
        const canvas = await new Jimp(721, 406);
        const avatar = await Jimp.read(user.displayAvatarURL({ format: "png", size: 512 }));
        const overlay = await Jimp.read(`${process.cwd()}/src/lib/images/respect.png`);

        avatar.scaleToFit(90, 90);
        canvas.composite(avatar, 110, 45).composite(overlay, 0, 0);
        const msg = await this.sendCanvas(message, canvas);
        msg.react("🇫");
    }
};
