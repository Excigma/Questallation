const { MusicCommand, util: { showSeconds } } = require(`${process.cwd()}/src/index`);

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			aliases: ["q"],
			description: "Check the queue list."
		});
	}

	async run(msg) {
		const { next, queue, autoplay } = msg.guild.music;
		const output = [];
		for (let i = 0; i < Math.min(queue.length, 10); i++) {
			output[i] = [
				`${i}] *${queue[i].title.replace(/\*/g, "\\*")}* requested by **${queue[i].requester.tag || queue[i].requester}**`,
				`   > <https://youtu.be/${queue[i].url}> (${showSeconds(queue[i].seconds * 1000)})`
			].join("\n");
		}
		if (queue.length > 10) output.push(`\nShowing 10 songs / ${queue.length}`);
		else if (autoplay) output.push(`\n**Autoplay**: <${next}>`);

		return msg.sendMessage(output.join("\n"));
	}

};
