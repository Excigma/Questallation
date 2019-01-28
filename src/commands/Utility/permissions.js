const { Command } = require(`${process.cwd()}/src/index`);
const { convertPerms } = require(`${process.cwd()}/src/lib/permissions.js`);
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["perms"],
            runIn: ["text"],
            description: "Shows the things a member can do in a server",
            extendedHelp: ["", "@Excigma#0321"],
            usage: "[member:member]"
        });
    }

    async run(message, [member = message.member]) {
        const perms = convertPerms(member.permissions.bitfield);
        let has = "```diff\n";
        let nohas = "```diff\n";
        for (const perm in perms) {
            if (perms[perm]) has += `+${perm}\n`;
            else nohas += `-${perm}\n`;

            if (perm == "Administrator" && perms[perm]) {
                nohas = "```​";
                has = "```diff\n+ All (has Administrator perm)";
                break;
            }
        }
        has += "\n```";
        nohas += "\n```";
        message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
            .setTitle(`Permissions for ${member.user.tag}`)
            .setDescription(`Has permissions:${has}\nDoes not have:${nohas}`));
    }
};
