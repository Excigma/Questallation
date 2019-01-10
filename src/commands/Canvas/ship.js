const { Command } = require("klasa");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const Jimp = require("jimp");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Aw cute.",
			extendedHelp: "Sends an image of avatars of two users with a heart.",
			usage: "<User:user> [User2:user]",
			cooldown: 10,
			requirePermissions: ["ATTACH_FILES", "EMBED_LINKS"],
			usageDelim: " "
		});
	}

	async run(message, [user1, user2 = message.author]) {
		user1 = await this.client.users.fetch(user1.id);
		user2 = await this.client.users.fetch(user2.id);

		const canvas = await new Jimp(300, 100);
		const avatar1 = await Jimp.read(user1.displayAvatarURL({ format: "png", size: 512 }));
		const avatar2 = await Jimp.read(user2.displayAvatarURL({ format: "png", size: 512 }));
		const overlay = await Jimp.read(`${process.cwd()}/src/modules/heart.png`);

		avatar1.scaleToFit(100, 100);
		avatar2.scaleToFit(100, 100);

		canvas.composite(avatar1, 0, 0).composite(overlay, 100, 0).composite(avatar2, 200, 0);


		canvas.getBuffer("image/png", async (err, buffer) => {
			message.sendEmbed(new MessageEmbed()
				.setAuthor(message.author.username + ",", message.author.displayAvatarURL())
				.setColor(0x7289DA)
				.setTitle(`${user1.tag} X ${user2.tag}`)
				.attachFiles([new MessageAttachment(buffer, "ship.png")])
				.setImage("attachment://ship.png"));
		});
	}

};
