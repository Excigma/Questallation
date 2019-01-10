const { Command, Duration } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: false,
			description: "Creates a giveaway",
			aliases: ["remind"],
			usage: "<when:time> <text:str> [...]",
			usageDelim: ", "
		});
	}

	async run(message, [when, ...text]) {

		const msg = await message.channel.send({
			embed: new MessageEmbed()
				.setAuthor(message.author.tag, message.author.displayAvatarURL())
				.setColor("#7289DA")
				.setTitle("🎉 Giveaway!")
				.setDescription(text.join(" "))
				.addField("Giveaway is ending in:", `${Duration.toNow(when)} (Accurate to closest min.)`)
				.setFooter("React with 🎉 to join")
		}).then(m => m.react("🎉"));


		/*	const reminder = */		 await this.client.schedule.create("giveaway", when, {
			data: {
				channel: message.channel.id,
				message: message.id
			},
			catchUp: true
		});

		/*let interval =*/ setInterval(function(message) {
			msg.edit("", {
				embed: new MessageEmbed()
					.setAuthor(message.author.tag, message.author.displayAvatarURL())
					.setColor("#7289DA")
					.setTitle("🎉 Giveaway!")
					.setDescription(text.join(" "))
					.addField("Giveaway is ending in:", `${Duration.toNow(when)} (Accurate to closest min.)`)
					.setFooter("React with 🎉 to join")
			});
		}, 1000 * 60);
	}
};
