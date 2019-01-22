const { Event } = require(`${process.cwd()}/src/index`);
const { MessageEmbed, Util } = require("discord.js");

module.exports = class commandErrorEvent extends Event {

        /* eslint-disable max-len */
        async run(message, command, params, error) {
                if (typeof error === "string") return message.send(error);
                else this.client.console.wtf(`[COMMAND] ${command.category}:${command.name}\n${error.stack || error.message || error}`);
                this.client.channels.get("533028887811325952").send({
                    embed: new MessageEmbed()
                        .setAuthor(`${message.author.username},`, message.author.displayAvatarURL())
                        .setTitle("A command has errored.")
                        .setDescription(`\`\`\`xl\n${error.stack || error}\n\`\`\``)
                        .addField("Path", command.path)
                        .addField("Details", Util.escapeMarkdown(`Author: ${message.author.tag}\nAuthor ID: ${message.author.id}\nGuild name: ${message.guild.name}\nGuild ID: ${message.guild.id}`))
                        .setTimestamp()
                        .setColor(0x7289DA)
                });

                if (error.message) {
                    return message.send(`<a:ExcigmaCross:534470159604383744> | ${[
				"Oh no, ErrorText happened",
				"Nooo, ErrorText happened, the creator has been informed",
				"This command isn't working at the moment, because of ErrorText",
				"Only spiders loves finding bugs, like ErrorText",
				"Sadly ErrorText happed, so I couldn't run the command",
				"My stupid creator left an error: ErrorText",
				"The effects of broken code: ErrorText",
				";-; ErrorText, try again later",
				"My creator will try to fix ErrorText as soon as possible",
				"This project was started a year ago, some code may be outdated, maybe ErrorText was caused by one",
				"I've told my creator about ErrorText many times!",
				"Some more broken code I found, ErrorText, sigh",
				"Sorry, what? ErrorText happened"
			].random()
				.replaceAll("ErrorText", `\`${error.message}\``)}\nIn other words, an error has occured. This has been reported to the developer.`);
		}
		return message.send(`<a:ExcigmaCross:534470159604383744> | ${[
			"Oh no, ErrorText happened",
			"Nooo, ErrorText happened, the creator has been informed",
			"This command isn't working at the moment, because of ErrorText",
			"Only spiders loves finding bugs, like ErrorText",
			"Sadly ErrorText happed, so I couldn't run the command",
			"My stupid creator left an error: ErrorText",
			"The effects of broken code: ErrorText",
			";-; ErrorText, try again later",
			"My creator will try to fix ErrorText as soon as possible",
			"This project was started a year ago, some code may be outdated, maybe ErrorText was caused by one",
			"I've told my creator about ErrorText many times!",
			"Some more broken code I found, ErrorText, sigh",
			"Sorry, what? ErrorText happened"
		].random()
			.replaceAll("ErrorText", `\`an unknown error\``)}\nIn other words, an error has occured. This has been reported to the developer.`);
	}
};