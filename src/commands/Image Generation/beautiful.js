const { Command, MessageAttachment, MessageEmbed } = require(`${process.cwd()}/src/index`);
const Jimp = require("jimp");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Oh this-.",
            extendedHelp: "Oh this - this is beautiful",
            usage: "[User:user]",
            cooldown: 10,
            requirePermissions: ["ATTACH_FILES", "EMBED_LINKS"]
        });
    }

    async run(message, [user = message.author]) {
        user = await this.client.users.fetch(user.id);

        const canvas = await new Jimp(634, 675);
        const avatar = await Jimp.read(user.displayAvatarURL({ format: "png", size: 512 }));
        const overlay = await Jimp.read(`${process.cwd()}/src/modules/beautiful.png`);

        avatar.scaleToFit(180, 1800);

        canvas.composite(avatar, 415, 40).composite(avatar, 415, 375).composite(overlay, 0, 0);

        canvas.getBuffer("image/png", async(err, buffer) => {
            message.sendEmbed(new MessageEmbed()
                .setTitle("This... is beautiful")
                .attachFiles([new MessageAttachment(buffer, "beautiful.png")])
                .setImage("attachment://beautiful.png"));
        });
    }
};