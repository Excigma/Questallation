const { Task } = require("klasa");
const { MessageEmbed } = require("discord.js");

//todo: Give away fixing xd

module.exports = class extends Task {
	async run({ channel, msg }) {
		const _channel = this.client.channels.get(channel);
		const message = await _channel.messages.fetch(msg);

		const winner = message.reactions.users.filter(user => !user.bot).map(u => u.id).random();
		if (winner) {
			message.edit(`<@${winner}>, You have won the giveaway`, {
				embed: new MessageEmbed()
					.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
					.setColor("#7289DA")
					.setTitle("🎉 Giveaway!")
					.setDescription(text.join(" "))
					.addField("Giveaway Ended!", `This winner is <@${winner}>`)
					.setFooter("React with 🎉 to join")
			});
		} else {
			message.edit(`<@${this.client.user.id}>, You have won the giveaway`, {
				embed: new MessageEmbed()
					.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
					.setColor("#7289DA")
					.setTitle("🎉 Giveaway!")
					.setDescription(text.join(" "))
					.addField("Giveaway Ended!", "No one entered the giveaway, let's just say I won.")
					.setFooter("React with 🎉 to join")
			});
		}
	}
};