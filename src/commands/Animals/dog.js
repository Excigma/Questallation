const { Command } = require("klasa");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Posts a random dog.",
			aliases: ["doggo", "puppy"],
			extendedHelp: "This command will post a random dog from dog.ceo."
		});
	}
	async run(message) {
		try {
			const { body } = await fetch("https://dog.ceo/api/breeds/image/random").then(res => res.json());
			if (!body) return message.sendMessage("<:excigmabot_failure:490319592477032448> | There was an error, please try again later.");
			message.sendEmbed(new MessageEmbed()
				.setTitle("Dog")
				.setImage(body.message));
		} catch (e) {
			this.client.emit("error", e.stack);
			message.sendMessage("<:excigmabot_failure:490319592477032448> | There was an error, please try again later.");
		}
	}
};