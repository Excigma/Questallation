const { Command, Timestamp, Duration, RichDisplay } = require("klasa");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const Jimp = require("jimp")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "Get information of a mentioned user.",
            usage: "[User:user]",
            extendedHelp: ["", "@Excigma#0321"],
            aliases: ["user-info", "whois", "ui"],
            requiredPermissions: ["ADD_REACTIONS", "EMBED_LINKS", "MANAGE_MESSAGES"]
        });
        this.statuses = {
            online: "💚 Online",
            idle: "💛 Idle",
            dnd: "❤ Do Not Disturb",
            offline: "🖤 Offline"
        };
        this.timestamp = new Timestamp("d MMMM YYYY");
    }

    async run(message, [user = message.author]) {
        const member = message.guild.members.get(user.id);
        const display = new RichDisplay()

        display.addPage(new MessageEmbed(message.excigmaEmbed)
            .setAuthor(`${message.author.username},`, message.author.displayAvatarURL())
            .setColor(0x7289DA)
            .addField("❯ Discord tag", user.tag)
            .addField("❯ ID", user.id)
            .addField("❯ Discord Join Date", `${this.timestamp.display(user.createdAt)}, (${Duration.toNow(user.createdAt)})`)
            .addField(`❯ ${user.presence.activity? user.presence.activity.type.toProperCase() : this.statuses[user.presence.status]}`, user.presence.activity ? user.presence.activity.name : "Not playing anything")
            .setThumbnail(user.displayAvatarURL()))



        var roles = ""
        if (member) {
            const roleslist = member ? member.roles.array().sort((a, b) => a.comparePositionTo(b)).slice(1).reverse().map(role => role.name) : "";
            for (var i = roleslist.length; i > 0; i--) {
                if (roles.length < 50) {
                    roles += roleslist[0] + ", "
                    roleslist.shift();
                } else {
                    roles += `and ${roleslist.length} other roles....`
                    break;
                }
            }

            display.addPage(new MessageEmbed(message.excigmaEmbed)
                .addField("❯ Nickname", member ? member.displayName : "N/A, User not in server")
                .addField("❯ Server Join Date", member ? this.timestamp.display(member.joinedTimestamp) : "N/A, User not in server")
                .addField("❯ Roles", roles.length > 0 ? roles.slice(0, -1) : "No roles."))
        }
        return display.run(await message.send("Loading data..."));
    }
};