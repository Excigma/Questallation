const { Command } = require(`${process.cwd()}/src/index`);

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            permissionLevel: 10,
            description: "Sends an invite to a server.",
            usage: "<GuildID:str>",
            extendedHelp: ["Some_Server_ID"]
        });
    }

    async run(message, [id]) {
        try {
            const channel = this.client.guilds.get(id).channels.find(c => c.permissionsFor(c.guild.me).has("CREATE_INSTANT_INVITE"));
            channel.createInvite({
                maxUses: 1
            }).then(invite =>
                message.send(invite.url)
            );
        } catch (e) {
            throw e;
        }
    }
}; // joke pun quote
