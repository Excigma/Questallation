const { Event } = require("klasa");

module.exports = class extends Event {

	run(guild) {
		if (this.client) {
			this.client.channels.get("450120292312940544").send(`Joined ${guild.name}, \`${guild.id}\`, with ${guild.memberCount} members. I'm now in ${this.client.guilds.size} servers.`);
		}
	}
};
