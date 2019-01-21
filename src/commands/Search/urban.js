const { Command, RichDisplay } = require("klasa");
const fetch = require("node-fetch")
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "213213% accurate definitions. This command is marked as nsfw.",
            usage: "<query:str>",
            extendedHelp: ["word", "what"],
            nsfw: true,
            requiredPermissions: ["ADD_REACTIONS", "EMBED_LINKS", "MANAGE_MESSAGES"]
        });
    }

    async run(message, [Query]) {

        const display = new RichDisplay();

        const body = await fetch(`http://api.urbandictionary.com/v0/define?term=${Query.split(" ").join("+")}`).then(res => res.json())

        if (body.list.length < 1) return message.sendMessage("<a:ExcigmaCross:534470159604383744> | There was no definition found.");

        for (const define of body.list) {
            const embed = new MessageEmbed(message.excigmaEmbed)
                .setURL(define.permalink)
                .setTitle(`Urban: ${Query}`)
                .setDescription(`**Definition:** ${define.definition}`)
                .addField("Example", define.example ? define.example : "No example provided.")
                .addField("Votes", `${define.thumbs_up} \`👍\` | ${define.thumbs_down} \`👎\` `);
            display.addPage(embed);
        }

        return display.run(await message.send("Getting definition..."));
    }
};