const { Command } = require("klasa");

const converter = (string) => {
	const finalPhrase = [];
	string.split(" ").forEach(word => {
		if (Math.random() > 0.7) finalPhrase.push(`${word.charAt(0)}-${word}`);
		else finalPhrase.push(word);
		if (Math.random() > 0.99) finalPhrase.push("_OwO, what's this?_");
	});
	return finalPhrase.join(" ").replaceAll("l", "w").replaceAll("L", "W").replaceAll("r", "w").replaceAll("R", "W") + [" x3", " :3", " owo", " OwO", " OWO", " O.o", " Uwu"].random();
};


module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Owo what's this",
			usage: "<Text:str>",
			extendedHelp: "Convert your boring English sentences into amazing and exciting Engwish."
		});
	}

	async run(message, [str]) {
		message.sendEmbed({
			title: "Hewwo?",
			color: 0x7289DA,
			author: {
				name: message.author.tag,
				icon_url: message.author.avatarURL()
			},
			description: converter(str)
		});
	}
};