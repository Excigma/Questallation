const { Command } = require("klasa");
const { MessageAttachment, MessageEmbed } = require("discord.js");
const Jimp = require("jimp");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
			aliases: ["colour"],
			description: "Sends info about a hex color, or generates a random color.",
			extendedHelp: ["", "#7289DA"],
			usage: "[Hex:str{7,7}]"
		});
	}

	async run(message, [hex = "#" + Math.floor(Math.random() * 16777215).toString(16)]) {
		const canvas = await new Jimp(64, 64, Jimp.cssColorToHex(hex));
		const rgb = Jimp.intToRGBA(Jimp.cssColorToHex(hex));
		canvas.getBuffer("image/png", async function(err, buffer) {
			message.sendEmbed(new MessageEmbed()
				.setDescription(`Your HEX code was \`${hex}\`, and the RGB is \`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})\``)
				.attachFiles([new MessageAttachment(buffer, "color.png")])
				.setThumbnail("attachment://color.png"), "Here you go!");
		});
	}
};
