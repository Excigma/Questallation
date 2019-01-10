const { Command } = require("klasa");
const { MessageAttachment } = require("discord.js");
const Jimp = require("jimp");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Contrast ",
			extendedHelp: "A contrast filter.",
			usage: "[User:user] [Value:integer{0,10}]",
			usageDelim: " ",
			cooldown: 10
		});
	}

	async run(message, [user = message.author, value = 10]) {
		user = await this.client.users.fetch(user.id);

		value = (value - 5) / 5;
		const avatar = await Jimp.read(user.displayAvatarURL({ format: "png", size: 512 }));
		avatar.contrast(value);
		avatar.getBuffer("image/png", async (err, buffer) => {
			message.sendMessage({ files: [new MessageAttachment(buffer, 'image.png')] })
		});
	}
};
