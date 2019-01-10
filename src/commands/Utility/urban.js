const { Command, RichDisplay } = require("klasa");
const { get } = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: "213213% accurate definitions. This command is marked as nsfw.",
			usage: "<query:str>",
			extendedHelp: ["word", "what"],
			nsfw: true
		});
	}

	async run(message, [Query]) {

		const display = new RichDisplay();

		const { body } = await get(`http://api.urbandictionary.com/v0/define?term=${Query.split(" ").join("+")}`);

		if (body.list.length < 1) return message.sendMessage("<:excigmabot_failure:490319592477032448> | There was no definition found.");

		for (const define of body.list) {
			const embed = new MessageEmbed()
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
