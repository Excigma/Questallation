const { Command } = require("klasa");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 10,
			description: "Sends an invite to a server.",
			usage: "<GuildID:str>"
		});
	}

	async run(message, [id]) {
		try {
			const channel = this.client.guilds.get(id).channels.find(c => c.permissionsFor(c.guild.me).has("CREATE_INSTANT_INVITE"));
			channel.createInvite({
				maxUses: 1
			}).then(invite =>
				message.sendMessage(invite.url)
			);
		} catch (e) {
			message.response(`Oh no! ${e}`);
		}
	}
};