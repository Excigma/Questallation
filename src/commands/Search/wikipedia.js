const { Command, RichDisplay } = require(`${process.cwd()}/src/index`);
const fetch = require("node-fetch");
const { MessageEmbed, Util } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "Finds a Wikipedia Article by the title.",
            usage: "<query:str>",
            extendedHelp: ["trains", "cars", "Germany"],
            requiredPermissions: ["ADD_REACTIONS", "EMBED_LINKS", "MANAGE_MESSAGES"]
        });
    }

    async run(message, [query]) {
        const body = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${query}`)
            .then(res => res.json());

        const chunks = Util.splitMessage(body.extract, {
            maxLength: 500,
            char: "."
        })
        if (typeof chunks == "object") {
            const display = new RichDisplay();
            for (const entry of chunks) {
                const embed = new MessageEmbed(message.excigmaEmbed)
                    .setThumbnail(body.thumbnail.source)
                    .setURL(body.content_urls.desktop.page)
                    .setTitle(`Wikipedia: ${body.title}`)
                    .setDescription(`**${body.description}**\n${entry}`);
                display.addPage(embed);
            }
            return display.run(await message.send("Loading results.."));
        } else {
            const embed = new MessageEmbed(message.excigmaEmbed)
                .setThumbnail(body.thumbnail.source)
                .setURL(body.content_urls.desktop.page)
                .setTitle(`Wikipedia: ${body.title}`)
                .setDescription(`**${body.description}**\n${chunks}`);
            message.sendEmbed(embed)
        }
    }

};