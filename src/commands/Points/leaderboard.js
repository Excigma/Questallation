const { Command, RichDisplay, MessageEmbed } = require(`${process.cwd()}/src/index`);
const { Util } = require("discord.js");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Get the leaderboard.",
			aliases: ["top", "lb"]

		});
	}

	async run(message) {
		const display = new RichDisplay();
		const global = "global" in message.flags;
		const users = global ? this.client.users : message.guild.members;
		const data = users
			.filter(user => user.settings.experience)
			.sort((a, b) => b.settings.experience - a.settings.experience).array();
		const sorted = data.map((user, place) => `(${place + 1}) ${global ? user.tag : user.user.tag}: ${user.settings.experience}`).join("\n");
		const chunks = Util.splitMessage(sorted, { char: "\n", maxLength: 250 });
 console.log(chunks)

		if (typeof chunks === "object") {
			for (const chunk of chunks) {
				display.addPage(new MessageEmbed(message.excigmaEmbed)
					.setDescription(`You are placing ${data.findIndex(user => (global ? user.id : user.user.id) === message.author.id) + 1} ${global ? "globally" : "in this server"}\n${chunk}`));
			}
			return display.run(await message.send("Loading data..."));
		} else {
			return message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
				.setDescription(`You are placing ${data.findIndex(user => (global ? user.id : user.user.id) === message.author.id) + 1} ${global ? "globally" : "in this server"}\n${chunks}`));
		}
	}
};
