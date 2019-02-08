const { Command, RichDisplay } = require(`${process.cwd()}/src/index`);
const { MessageEmbed, Util } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "Lists the channels of a server.",
            extendedHelp: [""],
            aliases: ["lc"],
            runIn: ["text"],
            requiredPermissions: ["ADD_REACTIONS", "EMBED_LINKS", "MANAGE_MESSAGES"]
        });
    }

    async run(message) {
        const display = new RichDisplay();

        const chunks = Util.splitMessage(message.guild.channels.array().sort((a, b) => a.position < b.position).map(channel => `${channel.name} (${channel})\n`).join(""), {
            maxLength: 500,
            char: "\n"
        });
        if (typeof chunks === "object") {
            for (const chunk of chunks) {
                display.addPage(new MessageEmbed(message.excigmaEmbed)
                    .setTitle("List channels")
                    .setDescription(chunk));
            }
            return display.run(await message.send("Loading data..."));
        } else {
            return message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
                .setTitle("List channels")
                .setDescription(chunks));
        }


    }

};
