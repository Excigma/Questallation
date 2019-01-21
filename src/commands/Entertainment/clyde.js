const { Command } = require("klasa");
const fetch = require("node-fetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "Make Clyde appear",
            usage: "<Text:str{0,100}>",
            requiredPermissions: ["MANAGE_WEBHOOKS"],
            extendedHelp: ["Beep boop"]
        });
    }

    async run(msg, str) {
        if (/@(everyone|here)/g.test(str)) return msg.send("<:excigmabot_warn:490319593274081280> | No you cannot mention everyone.");
        const webhook = await msg.channel.createWebhook("CIyde", {
            avatar: "https://discordapp.com/assets/f78426a064bc9dd24847519259bc42af.png"
        });

        await fetch(`https://discordapp.com/api/webhooks/${webhook.id}/${webhook.token}`, {
            method: "POST",
            body: JSON.stringify({ content: `${msg.author.tag} | ${str}` }),
            headers: { "Content-Type": "application/json" }
        });

        await webhook.delete();
        return msg.delete().catch(e => {});
    }

};