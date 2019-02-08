const { Command, RichDisplay } = require(`${process.cwd()}/src/index`);
const { MessageEmbed, Util } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "List users",
            extendedHelp: ["Role"],
            aliases: ["lu"],
            runIn: ["text"],
            usage: "[Role:role]",
            requiredPermissions: ["ADD_REACTIONS", "EMBED_LINKS", "MANAGE_MESSAGES"]
        });
    }

    async run(message, [role = message.guild.defaultRole]) {
        const display = new RichDisplay();
        const roleMembers = message.guild.members.filter(member => member.roles.some(r => r == role));
        const chunks = Util.splitMessage(roleMembers.array().sort((a, b) => a.displayName < b.displayName).map(member => `${member.displayName} (${member})\n`).join(""), {
            maxLength: 500,
            char: "\n"
        });
        if (typeof chunks === "object") {
            for (const chunk of chunks) {
                display.addPage(new MessageEmbed(message.excigmaEmbed)
                    .setTitle(`List users with ${role.name}`)
                    .setDescription(chunk));
            }
            return display.run(await message.send("Loading data..."));
        } else {
            return message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
                .setTitle(`List users with ${role.name}`)
                .setDescription(chunks));
        }
    }
};
