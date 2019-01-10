const { Command, Duration } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: "Creates a reminder, the bot will mention you in the channel you created the reminder in.",
			aliases: ["remind"],
			usage: "<when:time> <text:str> [...]",
			usageDelim: ", ",
			extendedHelp: ["5 mins, go outside", "10 mins, do laundry"]
		});
	}

	async run(message, [when, ...text]) {
		const reminder = await this.client.schedule.create("reminder", when, {
			data: {
				channel: message.channel.id,
				user: message.author.id,
				text: text.join(", ")
			},
			catchUp: true
		});
		return message.sendEmbed(new MessageEmbed()
			.setTitle(`New reminder created with ID: ${reminder.id} in ${Duration.toNow(when)}`)
			.setDescription(text));
	}
};
