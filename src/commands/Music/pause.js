const { MusicCommand } = require(`${process.cwd()}/src/index`);

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			description: "Pauses the current song.",
			requireMusic: true
		});
	}

	async run(msg) {
		const { music } = msg.guild;
		if (!music.playing) throw "<:excigmabot_failure:490319592477032448> | Nothing is playing.";

		music.pause();
		return msg.sendMessage("<:excigmabot_success:490319592615575553> | Music has been paused");
	}

};
