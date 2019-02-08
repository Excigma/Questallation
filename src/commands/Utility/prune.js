const { Command, klasaUtil: util } = require(`${process.cwd()}/src/index`);
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            permissionLevel: 4,
            description: "This command deletes the number of messages specified, maximum is 100",
            extendedHelp: [
                "20",
                "100 links",
                "50 bots",
                "20 you",
                "69 me",
                "10 upload",
                "100 @Excigma#0321"
            ],
            requiredPermissions: ["MANAGE_MESSAGES"],
            userPermissions: ["MANAGE_MESSAGES"],
            usage: "<Messages:integer> [links|bots|you|me|upload|files|attachments|user:user]",
            usageDelim: " "
        });
    }

    async run(message, [limit, filter = null]) {
        let msg = `<a:ExcigmaTick:534470159465971722> | Successfully deleted **MessageCount** messages `;
        await util.sleep(500);
        await message.delete();
        let messages = await message.channel.messages.fetch({ limit: 100 });
        if (filter) {
            const user = typeof filter !== "string" ? filter : null;
            const type = typeof filter === "string" ? filter : "user";
            const msgFilter = this.getFilter(message, type, user);
            messages = messages.filter(msgFilter[0]);
            msg += user !== null ? msgFilter[1].replace("User", user.tag) : msgFilter[1];
        }
        messages = messages.array().slice(0, limit);
        if (messages.length < 1) return message.send(`<a:ExcigmaCross:534470159604383744> | There are no messages to delete`);
        if (Date.now() - 1209600000 > messages[messages.length - 1].createdTimestamp) msg += "\n<:excigmabot_warn:490319593274081280> |  Messages older than 2 weeks cannot be deleted";

        await message.channel.bulkDelete(messages, true);
        return message.channel.send(msg.replace("MessageCount", messages.length)).then(m => m.delete({ timeout: 5000 })).catch(err => {});
    }

    getFilter(message, filter, user) {
        switch (filter) {
            case "links":
                return [mes => /https?:\/\/[^ /.]+\.[^ /.]+/.test(mes.content), "with **links.**"];
            case "bots":
                return [mes => mes.author.bot, "by **bots.**"];
            case "you":
                return [mes => mes.author.id === this.client.user.id, "by **me.**"];
            case "me":
                return [mes => mes.author.id === message.author.id, "by **you.**"];
            case "uploads":
                return [mes => mes.attachments.size > 0, "with **attachments.**"];
            case "files":
                return [mes => mes.attachments.size > 0, "with **attachments.**"];
            case "attachments":
                return [mes => mes.attachments.size > 0, "with **attachments.**"];
            case "user":
                return [mes => mes.author.id === user.id, `by **User.**`];
            default:
                return () => [true, "that were sent."];
        }
    }
};
