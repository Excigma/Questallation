const { Command, version: klasaVersion, Duration } = require("klasa");
const { version: discordVersion } = require("discord.js");
const os = require("os");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description: language => language.get("COMMAND_STATS_DESCRIPTION")
		});
	}

	async run(message) {
		message.send(`
=  Bot infomation =
	User Count       :: ${this.client.guilds.reduce((p, c) => p + c.memberCount, 0).toLocaleString() + " users"}
	Bots Count       :: ${this.client.users.filter(user => user.bot).size.toLocaleString()} bots.
	Server Count     :: ${this.client.guilds.size.toLocaleString()} servers
	Custom emojis    :: ${this.client.emojis.size.toLocaleString()} emojis
	Channel Count    :: ${this.client.channels.size.toLocaleString()} channels
	Commands         :: ${this.client.commands.size} commands
	Heartrate ping   :: ${Math.round(this.client.ping)} ms
=  Process Statistics =
	DiscordJS ver    :: v${discordVersion}
	Klasa ver        :: v${klasaVersion}
	NodeJS ver       :: ${process.version}
	Process uptime   :: ${Duration.toNow(Date.now() - (process.uptime() * 1000))}
=  Computer Statistics =
	Operating system :: ${os.type().replace("_", " ")} v${os.release()}
	OS Uptime        :: ${Duration.toNow(Date.now() - (os.uptime() * 1000))}
	Memory Usage     :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
	Memory Heap      :: ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB
	Total memory     :: ${(os.totalmem() / Math.pow(1024, 3)).toLocaleString()} Gigabytes`, { code: "asciidoc" });
	}
};
