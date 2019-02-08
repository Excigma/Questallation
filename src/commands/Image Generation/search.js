const { Command } = require(`${process.cwd()}/src/index`);
const fetch = require("node-fetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "Could we find intelligent life?",
            usage: "[User:User] <Text:str{0,22}> [...]",
            usageDelim: ", ",
            extendedHelp: ["@Excigma#0321, Pineapple on pizza is bad", "@Excigma#0321, Pineapple on pizza is good"]
        });
    }

    async run(msg, [user = msg.author, ...str]) {
        var url = new URL(`https://dev.anidiots.guide/generators/thesearch`);
        url.searchParams.append("avatar", user.displayAvatarURL({ format: "png", size: 128 }));
        url.searchParams.append("text", str.join(" "));

        const body = await fetch(url, {
            method: "GET",
            headers: { Authorization: process.env.AIG_API }
        }).then(res => res.json());
        return msg.channel.send({ files: [Buffer.from(await body.data)] });
    }

};
