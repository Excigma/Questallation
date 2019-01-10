const { Command } = require("klasa");
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: "Flip a coin.",
			extendedHelp: "This command flips a coin for you.",
			usage: "[faces:int{1,1000}]"
		});
	}

	async run(message, [faces = 6]) {
		await message.sendMessage("<a:typing:434472906970628096> | Rolling some dice.");
		message.sendMessage(`You've rolled ${Math.round(Math.random() * faces)} on a ${faces} sided die.`);
	}
};
