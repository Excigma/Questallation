const { Command } = require("klasa");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ["text"],
			guarded: true,
			description: language => language.get("COMMAND_INVITE_DESCRIPTION")
		});
	}

	async run(message) {
		return message.sendEmbed({
			color: 0x7289DA,
			author: {
				name: message.author.tag,
				icon_url: message.author.avatarURL()
			},
			fields: [{
				name: "Invite me",
				value: `If you want to add me to your guild, you can do so by grabbing my invite code from [here](https://ExcigmaBot.glitch.me/invite) or alternatively, [here](${this.client.invite})`
			},
			{
				name: "$ Σ:\\Excigmabot>_",
				value: "If you need help with anything, you can join my support server to get help with getting me ready on your guild! [here](https://ExcigmaBot.glitch.me/support), or alternatively, [here](https://discord.gg/VW9AKXh)"
			}
			]
		});
	}

};
