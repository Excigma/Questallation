const { Command } = require("klasa");
const snekfetch = require("snekfetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: "Finds a Wikipedia Article by the title.",
			usage: "<query:str>",
			extendedHelp: ["trains", "cars", "Germany"]
		});
	}

	async run(message, [query]) {
		const article = await snekfetch
			.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${query}`)
			.then(res => res.body)
			.catch(() => {
				throw "I couldn't find a wikipedia article with that title!";
			});

		const embed = new MessageEmbed()
			.setURL(article.content_urls.desktop.page)
			.setTitle("Wikipedia:" + article.title)
			.setDescription(article.extract);
		return message.sendMessage({ embed });
	}

};