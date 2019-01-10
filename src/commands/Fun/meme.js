const { Command } = require("klasa");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 0,
			description: "Get a random meme",
			extendedHelp: "Gets a random meme from reddit"
		});
	}

	async run(message) {
		const body = await fetch(`https://www.reddit.com/r/${[
			"wholesomememes",
			"onlywholesomememes",
			"dankmemes",
			"wholesomememes",
			"memes",
			"MemeEconomy",
			"meirl",
			"Me_irl",
			"holdmybeer",
			"facepalm",
			"CrappyDesign",
			"onejob",
			"trippinthroughtime",
			"MildlyVandalised",
			"mildlyinteresting",
			"fffffffuuuuuuuuuuuu"
		].random()}/random.json`).then(res => res.json());

		if (!body[0].data.children[0].data.preview.images[0].source.url) return message.reply("<:excigmabot_warn:490319593274081280> | There is no image with this post, please try again. ");

		if (body[0].data.children[0].data.over_18 && !message.channel.nsfw) {
			return message.sendMessage("<:excigmabot_warn:490319593274081280> | I cant post a NSFW image in this channel unless you mark it as NSFW");
		}

		message.sendEmbed(new MessageEmbed()
			.setTitle(body[0].data.children[0].data.title)
			.setURL(body[0].data.children[0].data.preview.images[0].source.url)
			.setColor("#7289da")
			.setImage(body[0].data.children[0].data.preview.images[0].source.url)
		);
	}
};
