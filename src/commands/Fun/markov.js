const { Command } = require("klasa");
const { MessageEmbed } = require("discord.js");
const MarkovChain = require("markovchain");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Generate a markov chain from the text chat.",
			requiredPermissions: ["READ_MESSAGE_HISTORY"]
		});
	}

	async run(message) {
		let messageBank = await message.channel.messages.fetch({ limit: 100 });

		const markovBank = [];
		for (const msg of messageBank.values()) {
			if (msg.content) markovBank.push(msg.content);
		}

		const quotes = new MarkovChain(markovBank.join(" "));
		const chain = quotes.start(this.useUpperCase).end(20).process();

		return message.sendEmbed(new MessageEmbed()
			.setColor(0x7289DA)
			.setTitle("MarkOV chain")
			.setDescription(chain.substring(0, 1999)));
	}
	useUpperCase(wordList) {
		const tmpList = Object.keys(wordList).filter((word) => word[0] >= "A" && word[0] <= "Z");
		return tmpList[Math.floor(Math.random() * tmpList.length)];
	}
};