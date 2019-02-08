const { CanvasCommand } = require(`${process.cwd()}/src/index`);
const Jimp = require("jimp");

module.exports = class extends CanvasCommand {
    constructor(...args) {
        super(...args, {
            description: "Crops your avatar to a Discord logo shape",
            extendedHelp: ["", "@Excigma#0321"],
            usage: "[User:user]",
            aliases: ["discord"],
            cooldown: 10,
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS", "ADD_REACTIONS"]
        });
    }

    async run(message, [user = message.author]) {
        Promise.all([Jimp.read(user.avatarURL({ size: 512, format: "png" })), Jimp.read(`${process.cwd()}/src/lib/images/discord-mask.png`)]).then((images) => {
            this.sendCanvas(message, images[0].mask(images[1], 0, 0));
        });
    }
};
