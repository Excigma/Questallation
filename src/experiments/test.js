const { Command } = require("klasa");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js")

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			permLevel: 0,
			runIn: ["text"],
			description: "get from api"
		});
	}

	async run(message) {
		const body = await fetch("https://api-production.iceposeidon.com/streamers/live").then(res => res.json());
		if (body.streamers.length < 1) return message.send("No one is streaming at the moment :(");
		var result = "";
		for (const streamer of body.streamers) {
			result += `${streamer.streamer} / ${streamer.liveData.viewers}\n`; // \n is like enter, or newline
			result += `${streamer.liveData.title} [https://www.youtube.com/watch?v=${streamer.liveData.videoId}]\n`;
			result += `-----------\n`;
		}
		message.send({
			embed: new MessageEmbed()
				.setAuthor(message.author.tag, message.author.displayAvatarURL()) // you can change this .setAvatar("some text lol", https://link.to.an.image.png)
				.setTitle("Live Streams")
				.setDescription(result) // here is result again xD
				.setFooter(this.client.user.tag, this.client.user.displayAvatarURL())
				.setTimestamp()
				.setColor(0x7289DA) // '#7289DA' also works
		});
	}
};
