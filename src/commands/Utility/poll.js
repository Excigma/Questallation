const { Command, TextPrompt, Usage } = require("klasa");
const { MessageEmbed } = require("discord.js");
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: "Starts a poll",
			usage: "<Question:str> <Answer:str> [...]",
			usageDelim: "|"
		});
	}

	async run(message, [question, ...answers]) {
		const text = [];
		const unicode = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣", "🔟"];
		const chars = [];
		if (answers.length > 10) {
			message.sendMessage("There can be a maximum of 10 answers, answers after the 10 will be removed.");
			answers = answers.slice(0, 10);
		}
		for (let answerNum = 0; answerNum < answers.length; answerNum++) {
			text.push(`${unicode[answerNum]}  ❯ ${answers[answerNum]}`);
			chars.push(unicode[answerNum]);
		}
		const msg = await message.sendEmbed(new MessageEmbed()
			.setTitle(`Question: ${question}`)
			.setDescription(text.join("\n")));
		for (let reactions = 0; reactions < chars.length; reactions++) {
			msg.react(chars[reactions]);
		}
	}
};
