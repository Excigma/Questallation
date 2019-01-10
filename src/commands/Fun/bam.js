const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Hit someone",
			usage: "[User:user]",
			extendedHelp: "This command sends text of you 'hitting' someone"
		});
	}

	async run(message, [user]) {
		message.sendMessage(`** *💥 BAM*, ${message.author.tag}** ${[
			"hit {{member}} with a rock",
			"threw a handful dust at {{member}}",
			"ran into {{member}}",
			"hit {{member}} with a hammer",
			"used a sledgehammer to ram into {{member}}",
			"Swung a red hockey stick very hard at {{member}}",
			"punched {{member}}",
			"made {{member}} swallow some fireworks",
			"kicked {{member}} with boots",
			"tipped a bucket of water over {{member}}"
		].random()
			.replaceAll("{{member}}", `**${!user || !user.tag || user.id === message.author.id ? "themselves" : user.tag}**`)
		}.`);

	}

};
