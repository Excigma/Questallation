const { Command, Timestamp, Duration, RichDisplay } = require(`${process.cwd()}/src/index`);
const { MessageEmbed } = require("discord.js");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            description: "Get information on a role with an id or a mention or name.",
            usage: "<Role:role>",
            aliases: ["role-info", "ri"],
            extendedHelp: ["Moderators", "Contributors", "A role name in your server"],
            requiredPermissions: ["ADD_REACTIONS", "EMBED_LINKS", "MANAGE_MESSAGES"]
        });
        this.perms = {
            ADMINISTRATOR: "Administrator",
            VIEW_AUDIT_LOG: "View Audit Log",
            MANAGE_GUILD: "Manage Server",
            MANAGE_ROLES: "Manage Roles",
            MANAGE_CHANNELS: "Manage Channels",
            KICK_MEMBERS: "Kick Members",
            BAN_MEMBERS: "Ban Members",
            CREATE_INSTANT_INVITE: "Create Instant Invite",
            CHANGE_NICKNAME: "Change Nickname",
            MANAGE_NICKNAMES: "Manage Nicknames",
            MANAGE_EMOJIS: "Manage Emojis",
            MANAGE_WEBHOOKS: "Manage Webhooks",
            VIEW_CHANNEL: "Read Text Channels and See Voice Channels",
            SEND_MESSAGES: "Send Messages",
            SEND_TTS_MESSAGES: "Send TTS Messages",
            MANAGE_MESSAGES: "Manage Messages",
            EMBED_LINKS: "Embed Links",
            ATTACH_FILES: "Attach Files",
            READ_MESSAGE_HISTORY: "Read Message History",
            MENTION_EVERYONE: "Mention Everyone",
            USE_EXTERNAL_EMOJIS: "Use External Emojis",
            ADD_REACTIONS: "Add Reactions",
            CONNECT: "Connect",
            SPEAK: "Speak",
            MUTE_MEMBERS: "Mute Members",
            DEAFEN_MEMBERS: "Deafen Members",
            MOVE_MEMBERS: "Move Members",
            USE_VAD: "Use Voice Activity"
        };
        this.timestamp = new Timestamp("MMMM dd YYYY");
    }

    async run(message, [role]) {
        const allPermissions = Object.entries(role.permissions.serialize()).filter(perm => perm[1]).map(([perm]) => this.perms[perm]).join(", ");
        const display = new RichDisplay();

        display.addPage(new MessageEmbed(message.excigmaEmbed)
            .addField("❯ Name", role.name)
            .addField("❯ ID", role.id)
            .addField("❯ Color", role.hexColor || "None")
            .addField("❯ Creation Date", `${this.timestamp.display(role.createdAt)} (${Duration.toNow(role.createdAt)})`)
            .addField("❯ Mentionable", role.mentionable ? "Yes" : "No")
            .addField("❯ Position", role.position));

        display.addPage(new MessageEmbed(message.excigmaEmbed)
            .setDescription(`**❯ Permissions**\n ${allPermissions || "No permissions"}`)
            .addField("❯ Hoisted", role.hoist ? "Yes" : "No")
            .addField("❯ Mentionable", role.mentionable ? "Yes" : "No")
            .addField("❯ Position", role.position))
        return display.run(await message.send("Loading..."))
    }

};