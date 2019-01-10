const { Command } = require("klasa");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 10,
			description: "Echos a bit of text, attempt to delete the trigger.",
			usage: "<String:str>"
		});
	}

	async run(message, [str]) {
		message.channel.send(str).catch(() => { });
		message.delete().catch(() => { });

	}
};
