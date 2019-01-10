const { Command, Timestamp } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: "Get information of a mentioned user.",
			usage: "[User:user]",
			extendedHelp: ["", "@Excigma#0321"],
			aliases: ["userinfo", "whois"]
		});
		this.statuses = {
			online: "💚 Online",
			idle: "💛 Idle",
			dnd: "❤ Do Not Disturb",
			offline: "🖤 Offline"
		};
		this.timestamp = new Timestamp("d MMMM YYYY");
	}

	async run(message, [user = message.author]) {
		const member = message.guild.members.get(user.id);
		let roles = member ? member.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role.name) : "";

		const userInfo = new MessageEmbed()
			.setAuthor(message.author.username + ",", message.author.displayAvatarURL())
			.setColor(0x7289DA)
			.setThumbnail(user.displayAvatarURL())
			.addField("❯ Name", user.tag, true)
			.addField("❯ Nickname", member ? member.displayName : "N/A, User not in server", true)
			.addField("❯ ID", user.id, true)
			.addField("❯ Discord Join Date", this.timestamp.display(user.createdAt), true)
			.addField("❯ Server Join Date", member ? this.timestamp.display(member.joinedTimestamp) : "N/A, User not in server", true)
			.addField("❯ Status", this.statuses[user.presence.status], true)
			.addField("❯ Playing", user.presence.activity ? user.presence.activity.name : "Not playing anything", true)
			.addField("❯ Roles", member ? (roles.length ? roles.join(", ") : "No roles.") : "N/A, User not in server", true);

		return message.sendEmbed(userInfo);
	}

};