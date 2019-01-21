const { Command, RichDisplay } = require("klasa");
const fetch = require("node-fetch")
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

        constructor(...args) {
            super(...args, {
                description: "213213% accurate definitions. This command is marked as nsfw.",
                usage: "<query:str>",
                extendedHelp: ["word", "what"],
                aliases: ["definition", "oxford", "oxf", "meaning", "def", "df", "dict", "dictionary"],
                requiredPermissions: ["ADD_REACTIONS", "EMBED_LINKS", "MANAGE_MESSAGES"]
            });
        }

        async run(message, [query]) {
                try {
                    const display = new RichDisplay()
                    query = query.toLowerCase()
                    const body = await fetch(`https://od-api.oxforddictionaries.com/api/v1/entries/en/${encodeURIComponent(query)}`, {
                        headers: {
                            accept: "application/json",
                            app_id: process.env.OXFORD_ID,
                            app_key: process.env.OXFORD_KEY
                        }
                    }).then(res => res.json())
                    for (const result of body.results[0].lexicalEntries) {
                        const cat = result.lexicalCategory
                        const pronunciation = result.pronunciations[0].phoneticSpelling ? result.pronunciations[0].phoneticSpelling : "No pronunciations found"
                        for (const data of result.entries) {
                            display.addPage(new MessageEmbed(message.excigmaEmbed)
                                    .setTitle("Oxford dictionary | © 2016 Oxford University Press")
                                    .addField("Pronouciation", pronunciation)
                                    .addField("Type", cat)
                                    .setDescription(`${data.senses[0].domains ? `${data.senses[0].domains.join(", ")} |` : ""} ${data.senses[0].definitions.join("\n")}`)
                        .addField("Examples", data.senses[0].examples ? data.senses[0].examples.map(e => e.text) : "No examples"))
                }
            }
            display.run(await message.send("Getting definitions"))
        } catch (e) {
            return message.send("<a:ExcigmaCross:534470159604383744> | No such definition")
        }
    }
};