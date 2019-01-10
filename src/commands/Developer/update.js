const { Command, util } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ["pull"],
			permissionLevel: 10,
			description: "This updates the bot from its git repo.",
			extendedHelp: "This command is designed to update the bot from it's own repository, then reboots the bot for the changes to take effect."
		});
	}

	async run(message) {
		const { stdout, stderr } = await util.exec(`git fetch git@github.com:Excigma/ExcigmaBot.git
git reset --hard FETCH_HEAD
git clean -df
`, { timeout: 30000 });


		var out = [];
		if (stdout) out.push(stdout);
		if (stderr) out.push(stderr);

		await message.channel.send(`\`\`\`${out.join("\n------\n")}\`\`\``);
		await this.client.commands.get("reboot").run(message);
		await util.exec("refresh").catch(err => ({ err }));
	}
};
