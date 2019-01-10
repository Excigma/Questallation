const { Inhibitor } = require("klasa");

module.exports = class extends Inhibitor {

	constructor(...args) {
		super(...args, { spamProtection: true });
	}

	async run(msg, cmd) {
		if (cmd.requireMusic !== true) return;

		if (msg.channel.type !== "text") throw "<:excigmabot_warn:490319593274081280> | This command may be only executed in a server.";

		if (!msg.member.voice.channel) throw "<:excigmabot_failure:490319592477032448> | You are not connected in a voice channel.";
		if (!msg.guild.me.voice.channel) throw "<:excigmabot_warn:490319593274081280> | I am not connected in a voice channel.";
		if (msg.member.voice.channel !== msg.guild.me.voice.channel) throw "<:excigmabot_warn:490319593274081280> | You must be in the same voice channel as me.";
	}

};
