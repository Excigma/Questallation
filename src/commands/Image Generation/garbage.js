const { Command } = require(`${process.cwd()}/src/index`);
const fetch = require("node-fetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "I'm full of garbage!",
            usage: "[User:User]",
            aliases: ["trash"],
            extendedHelp: ["@Excigma#0321"]
        });
    }

    async run(msg, [user = msg.author]) {
        var url = new URL(`https://dev.anidiots.guide/generators/garbage`);
        url.searchParams.append("avatar", user.displayAvatarURL({ format: "png", size: 256 }));

        const body = await fetch(url, {
            method: "GET",
            headers: { Authorization: process.env.AIG_API }
        }).then(res => res.json());

        return msg.channel.send({ files: [Buffer.from(body.data)] });
    }

};