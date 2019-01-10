const { Command } = require("klasa");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const Jimp = require("jimp");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Press F.",
			extendedHelp: "Press F to pay respect.",
			usage: "[User:user]",
			cooldown: 10,
			requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS", "ADD_REACTIONS"]
		});
	}

	async run(message, [user = message.author]) {
		user = await this.client.users.fetch(user.id);
		const canvas = await new Jimp(721, 406);
		const avatar = await Jimp.read(user.displayAvatarURL({ format: "png", size: 512 }));
		const overlay = await Jimp.read(`${process.cwd()}/src/modules/respect.png`);

		avatar.scaleToFit(90, 90);
		canvas.composite(avatar, 110, 45).composite(overlay, 0, 0);


		canvas.getBuffer("image/png", async (err, buffer) => {
			message.sendEmbed(new MessageEmbed()
				.setAuthor(`${message.author.username  },`, message.author.displayAvatarURL())
				.setColor(0x7289DA)
				.setTitle("Press F to pay respect")
				.attachFiles([new MessageAttachment(buffer, "respect.png")])
				.setImage("attachment://respect.png")).then(m => m.react("🇫"));
		});
	}

};
