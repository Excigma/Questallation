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
		const data = this.client.users
			.filter(user => user.settings.experience)
			.sort((a, b) => b.settings.experience - a.settings.experience).array();
		const sorted = data.map((user, place) => `(${place + 1}) ${user.tag}: ${user.settings.experience}`).join("\n");
		console.log(data);
		const chunks = Util.splitMessage(sorted, { char: "\n", maxLength: 250 });


		if (typeof chunks === "object") {
			for (const chunk of chunks) {
				display.addPage(new MessageEmbed(message.excigmaEmbed)
					.setDescription(`You are placing ${data.indexOf(message.author) + 1}\n${chunk}`));
			}
			return display.run(await message.send("Loading data..."));
		} else {
			return message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
				.setDescription(`You are placing ${data.indexOf(message.author) + 1}\n${chunks}`));
		}
	}
};
