const { Command } = require("klasa");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Posts a random cat.",
			aliases: ["kitty"],
			extendedHelp: "This commands sends a random birb image from cataas.com."
		});
	}

	async run(message) {
		try {
			const body = await fetch("http://shibe.online/api/cats").then(res => res.json());
			if (!body) return message.sendMessage("<:excigmabot_failure:490319592477032448> | There was an error, please try again later.");
			message.sendEmbed(new MessageEmbed()
				.setTitle("Cat")
				.setImage(body[0]));
		} catch (e) {
			this.client.emit("error", e.stack);
			message.sendMessage("<:excigmabot_failure:490319592477032448> | There was an error, please try again later.");
		}
	}
};