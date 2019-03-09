const { Command } = require(`${process.cwd()}/src/index`);
const credits = require(`${process.cwd()}/src/lib/credits`);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: "List the roles of this server",
			extendedHelp: [""],
			runIn: ["text"]
		});
	}

	async run(message) {
		let toSend = "";

		for (const person of Object.keys(credits)) {
			const user = await this.client.users.fetch(person);
			toSend += `${await user.tag}: ${credits[person]}\n`;
		}
		message.send(toSend);
	}

};
