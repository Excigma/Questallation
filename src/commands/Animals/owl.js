const { Command } = require("klasa");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Posts a random owl.",
			extendedHelp: "This commands sends a random birb image from pics.floofybot.moe/owl."
		});
	}

	async run(message) {
		
		try {
			const body = await fetch("http://pics.floofybot.moe/owl").then(res => res.json());
			if (!body) return message.sendMessage("<:excigmabot_failure:490319592477032448> | There was an error, please try again later.");
			body.image.replaceAll(".gifv", "gif");
			message.sendEmbed(new MessageEmbed()
				.setTitle("Owl")
				.setImage(body.image));
		} catch (e) {
			this.client.emit("error", e.stack);
			message.sendMessage("<:excigmabot_failure:490319592477032448> | There was an error, please try again later.");
		}
	}
};