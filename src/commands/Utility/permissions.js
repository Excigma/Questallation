const { Command } = require("klasa");
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
        let permlist = "```diff\n";
        for (const perm in perms) {
            permlist += `${perms[perm] ? "+ Has" : "- Doesn't have"} ${perm}\n`;
            if (perm == "Administrator" && perms[perm]) {
                permlist = "```diff\n+ All (has Administrator perm)";
                break;
            }
        }
        permlist += "\n```";
        message.sendEmbed(new MessageEmbed()
            .setTitle(`Permissions for ${member.user.tag}`)
            .setDescription(permlist));
    }
};