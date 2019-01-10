const { Command } = require("klasa");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");


module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Posts a random birb.",
			aliases: ["birb"],
			extendedHelp: "This commands sends a random birb image from random.birb.pw."
		});
	}

	async run(message) {
		try {
			const body = await fetch("http://random.birb.pw/tweet/").then(res => res.text());
			if (!body) return message.sendMessage("<:excigmabot_failure:490319592477032448> | There was an error, please try again later.");
			message.sendEmbed(new MessageEmbed()
				.setTitle("Bird")
				.setImage(`https://random.birb.pw/img/${body}`));
		} catch (e) {
			this.client.emit("error", e.stack);
			message.sendMessage("<:excigmabot_failure:490319592477032448> | There was an error, please try again later.");
		}
	}
};
