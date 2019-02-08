const { Command, RichDisplay } = require(`${process.cwd()}/src/index`);
const { MessageEmbed, Util } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "List the roles of this server",
            extendedHelp: [""],
            aliases: ["lr"],
            runIn: ["text"]
        });
    }

    async run(message) {
        const display = new RichDisplay();

        const chunks = Util.splitMessage(message.guild.roles.array().sort((a, b) => a.comparePositionTo(b)).slice(1).reverse().map(role => `${role.name} (${role})\n`).join(""), {
            maxLength: 500,
            char: "\n"
        });
        if (typeof chunks === "object") {
            for (const chunk of chunks) {
                display.addPage(new MessageEmbed(message.excigmaEmbed)
                    .setTitle("List roles")
                    .setDescription(chunk));
            }
            return display.run(await message.send("Loading data..."));
        } else {
            return message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
                .setTitle("List roles")
                .setDescription(chunks));
        }


    }

};
