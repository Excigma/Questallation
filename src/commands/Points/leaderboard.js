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
		let place = 1;
		const data = this.client.users
			.filter(user => user.settings.experience)
			.sort((a, b) => a.settings.experience < b.settings.experience ? 1 : -1)
			.map(user => `(${place++}) ${user.tag}: ${user.settings.experience}`).join("\n");

		const chunks = Util.splitMessage(data, { char: "\n", maxLength: 500 });


		if (typeof chunks === "object") {
			for (const chunk of chunks) {
				display.addPage(new MessageEmbed(message.excigmaEmbed)
					.setDescription(chunk));
			}
			return display.run(await message.send("Loading data..."));
		} else {
			return message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
				.setDescription(chunks));
		}
	}
};
