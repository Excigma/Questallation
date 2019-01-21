const { Command } = require("klasa");
const fetch = require("node-fetch");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: "WoAh",
			usage: "[User:User]",
			aliases: ["sniper"],
			extendedHelp: ["@Excigma#0321"]
		});
	}

	async run(msg, [user = msg.author]) {
		var url = new URL(`https://dev.anidiots.guide/generators/sniper`);
		url.searchParams.append("avatar", user.displayAvatarURL({ format: "png", size: 256 }));

		const body = await fetch(url, {
			method: "GET",
			headers: { Authorization: process.env.AIG_API }
		}).then(res => res.json());

		return msg.channel.send({ files: [Buffer.from(body.data)] });
	}

};
