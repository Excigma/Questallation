const { Command, Timestamp } = require("klasa");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ["text"],
			aliases: ["guild-info", "serverinfo"],
			description: "Get information of the current server.",
			extendedHelp: [""]
		});
		this.verificationLevels = [
			"None",
			"Low",
			"Medium",
			"(╯°□°）╯︵ ┻━┻",
			"┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"
		];

		this.filterLevels = [
			"Off",
			"No Role",
			"Everyone"
		];
		this.timestamp = new Timestamp("d MMMM YYYY");
	}

	async run(message) {
		const serverInfo = new MessageEmbed()
			.setThumbnail(message.guild.iconURL())
			.addField("❯ Name", message.guild.name, true)
			.addField("❯ ID", message.guild.id, true)
			.addField("❯ Channels", message.guild.channels.size, true)
			.addField("❯ Voice Channels", message.guild.channels.filter(m => m.type === "voice").size, true)
			.addField("❯ Text Channels", message.guild.channels.filter(m => m.type === "text").size, true)
			.addField("❯ Creation Date", this.timestamp.display(message.guild.createdAt), true)
			.addField("❯ Region", message.guild.region.toProperCase(), true)
			.addField("❯ Explicit Filter", this.filterLevels[message.guild.explicitContentFilter], true)
			.addField("❯ Verification Level", this.verificationLevels[message.guild.verificationLevel], true)
			.addField("❯ Owner", message.guild.owner ? message.guild.owner.user.tag : "None", true)
			.addField("❯ Members", message.guild.memberCount, true)
			.addField("❯ Human members", message.guild.members.filter(m => !m.user.bot).size, true)
			.addField("❯ Members online", Math.round(((message.guild.members.filter(member => member.presence.status !== "offline").size) / (message.guild.members.size)) * 100) + "%", true)
			.addField("❯ Roles", message.guild.roles.map(r => r).join(" | ").length < 1024 ? message.guild.roles.sort((a, b) => b.position - a.position).map(r => r).join(" | ") : `${message.guild.roles.count} roles`);

		return message.sendEmbed(serverInfo);
	}

};