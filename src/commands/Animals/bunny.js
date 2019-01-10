const { Command } = require("klasa");
const fetch = require("node-fetch");
const { MessageEmbed} = require("discord.js");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Posts a random rabbit.",
			aliases: ["rabbit"],
			extendedHelp: "This commands sends a random rabbit image from bunnies.io."
		});
	}

	async run(message) {
		try {
			const body = await fetch("https://api.bunnies.io/v2/loop/random/?media=gif,png").then(res => res.json());
			if (!body) return message.sendMessage("<:excigmabot_failure:490319592477032448> | There was an error, please try again later.");
			message.sendEmbed(new MessageEmbed()
				.setTitle("Bunny")
				.setImage(body.media.gif));
		} catch (e) {
			this.client.emit("error", e.stack);
			message.sendMessage("<:excigmabot_failure:490319592477032448> | There was an error, please try again later.");
		}
	}
};