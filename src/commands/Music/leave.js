const { MusicCommand } = require(`${process.cwd()}/src/index`);

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			description: "Leaves the voice channel.",
			requireMusic: true
		});
	}

	async run(msg) {
		await msg.guild.music.leave();
		return msg.sendMessage(`<:excigmabot_success:490319592615575553> | Left the voice channel ${msg.guild.me.voice.channel}`);
	}

};
