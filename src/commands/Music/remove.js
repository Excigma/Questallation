const { MusicCommand } = require(`${process.cwd()}/src/index`);

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			usage: "<number:integer>",
			description: "Remove a song from the queue list.",
			requireMusic: true
		});
	}

	async run(msg, [number]) {
		if (number <= 0) {
			msg.send("<:excigmabot_failure:490319592477032448> | Number should be bigger or equal to 0");
		}
		number--;

		const { music } = msg.guild;
		if (music.queue.length < number) {
			msg.send(`<:excigmabot_failure:490319592477032448> | There are only ${music.queue.length} songs in the queue`);
		}

		const song = music.queue[number];
		if (song.requester.id !== msg.author.id) {
			if (!await msg.hasAtLeastPermissionLevel(5)) {
				return msg.send("<:excigmabot_failure:490319592477032448> | You cannot remove someone else's song unless you have manage server");
			}

			music.queue.splice(number, 0);
			return msg.sendMessage(`<:excigmabot_success:490319592615575553> | Removed **${song.title}** requested by **${song.requester}**.`);
		} else {
			music.queue.splice(number, 0);
			return msg.sendMessage(`<:excigmabot_success:490319592615575553> | Removed **${song.title}** requested by **${song.requester}**.`);
		}

	}
};
