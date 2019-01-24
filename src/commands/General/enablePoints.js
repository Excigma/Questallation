const { Command } = require("klasa");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ["text"],
			aliases: ["epoints"],
			permissionLevel: 6,
			guarded: true,
			description: "Enable level up messages"
		});
	}


	async run(message) {
		const status = await message.guild.settings.update("levelUp", message.guild.settings.levelUp ? "false" : "true", message.guild, { avoidUnconfigurable: true, action: "add" });
		return message.sendLocale("COMMAND_CONF_UPDATED", ["levelUp", message.guild.settings.resolveString(message, status.updated[0].piece)]);
	}
};
