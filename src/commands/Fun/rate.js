const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Rate command.",
			extendedHelp: "I'll rate you out of a hundred.",
			usage: "[User:user]"
		});
	}

	async run(message, [user = message.author]) {
		user = await this.client.users.fetch(user.id);
		var rate;
		const bg = Buffer.from(user.tag + user.id, "utf8").readUIntBE(0, 6);
		const rng = user.tag.length * Math.abs(Math.cos(bg)) * 10; // eslint-disable-next-line no-mixed-operators
		rate = 80 + (Math.round(100 - (bg * rng) % 100) / 5);

		return message.sendEmbed(new MessageEmbed()
			.setTitle("Rate")
			.setDescription(`I rate ${user.tag} ${rate}%!`));
	}

};
