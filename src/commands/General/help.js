const { Command, RichDisplay, util: { isFunction } } = require(`${process.cwd()}/src/index`);
const { MessageEmbed, Permissions } = require("discord.js");

const PERMISSIONS_RICHDISPLAY = new Permissions([Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.ADD_REACTIONS]);
const time = 1000 * 60 * 3;

module.exports = class extends Command {

        constructor(...args) {
            super(...args, {
                guarded: true,
                description: "Displays help for a specific command, or show a full command list",
                usage: "(Command:command)",
                extendedHelp: ["", "ping"]
            });

            this.createCustomResolver("command", (arg, possible, message) => {
                if (!arg || arg === "") return undefined;
                return this.client.arguments.get("command").run(arg, possible, message);
            });

            // Cache the handlers
            this.handlers = new Map();
        }

        async run(message, [command]) {
                if (command) {
                    return message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
                            .setTitle(`Help: ${command.name}`)
                            .setDescription(`**Description:**
${isFunction(command.description) ? command.description(message.language) : command.description}
**Usage:**
${command.usage.fullUsage(message)}
**Example(s):**
${typeof command.extendedHelp == "object" ? command.extendedHelp.map(example => `${message.guildSettings.prefix} ${command.name} ${example}`).join("\n") : "No example for this command"}`));
		}

		if (message.guild && message.channel.permissionsFor(this.client.user).has(PERMISSIONS_RICHDISPLAY)) {
			// Finish the previous handler
			const previousHandler = this.handlers.get(message.author.id);
			if (previousHandler) previousHandler.stop();

			const handler = await (await this.buildDisplay(message)).run(await message.send("Loading Commands..."), {
				filter: (reaction, user) => user.id === message.author.id,
				time
			});
			handler.on("end", () => this.handlers.delete(message.author.id));
			this.handlers.set(message.author.id, handler);
			return handler;
		}

		const method = this.client.user.bot ? "author" : "channel";
		return message[method].send(await this.buildHelp(message) + "\nOr check online for the commands: https://excigmabot.glitch.me/commands", { split: { char: "\n" } })
			.then(() => { if (message.channel.type !== "dm" && this.client.user.bot) message.sendMessage("<a:ExcigmaTick:534470159465971722> | The list of commands you have access to has been sent to your DMs."); })
			.catch(() => { if (message.channel.type !== "dm" && this.client.user.bot) message.sendMessage("<a:ExcigmaCross:534470159604383744> | You have DMs disabled, I couldn't send you the commands in DMs.\nYou can check online for our commands here though: https://excigmabot.glitch.me/commands"); });
	}

	async buildHelp(message) {
		const commands = await this._fetchCommands(message);
		const helpMessage = [];
		for (const [category, list] of commands) {
			helpMessage.push(`**${category} Commands**:\n`, list.map(this.formatCommand.bind(this, message, message.guildSettings.prefix, false)).join("\n"), "");
		}
		return helpMessage.join("\n");
	}

	async buildDisplay(message) {
		const commands = await this._fetchCommands(message);
		const display = new RichDisplay();
		for (const [category, list] of commands) {
			display.addPage(new MessageEmbed(message.excigmaEmbed)
				.setAuthor(message.author.username + ",", message.author.displayAvatarURL())
				.setColor(0x7289DA)
				.setTitle(`${category} Commands`)
				.setDescription(list.map(this.formatCommand.bind(this, message, message.guildSettings.prefix, true)).join("\n"))
			);
		}

		return display;
	}

	formatCommand(message, prefix, richDisplay, command) {
		return richDisplay ? `• ${prefix}${command.name} → ${isFunction(command.description) ? command.description(message.language) : command.description}` : `• **${prefix}${command.name}** → ${isFunction(command.description) ? command.description(message.language) : command.description}`;
	}

	async _fetchCommands(message) {
		const run = this.client.inhibitors.run.bind(this.client.inhibitors, message);
		const commands = new Map();
		await Promise.all(this.client.commands.map((command) => run(command, true)
			.then(() => {
				const category = commands.get(command.category);
				if (category) category.push(command);
				else commands.set(command.category, [command]);
			}).catch(() => {
				// noop
			})
		));

		return commands;
	}

};