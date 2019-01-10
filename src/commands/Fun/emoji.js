const { Command } = require("klasa");
const basename = require(`${process.cwd()}/src/modules/twemoji-basename.js`);
const twemojiList = require(`${process.cwd()}/src/modules/twemoji.json`);
const emoteList = require(`${process.cwd()}/src/modules/emojis.json`);
const fetch = require("node-fetch");
const { MessageEmbed, Util } = require("discord.js");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Make emoji bigger.",
			aliases: ["big", "emote"],
			extendedHelp: "This command will enlarge an emoji!",
			usage: "<Emoji:str> [DiscordEmoji:boolean]",
			usageDelim: ", ",
			requiredPermissions: ["EMBED_LINKS"]

		});
	}

	async run(message, [emoji, discordemoji = false]) {
		emoji = emoji.toLowerCase();
		if (discordemoji === true) {
			if (!emoteList[emoji]) return message.sendMessage("<:excigmabot_failure:490319592477032448> | That is not a valid emote.");
			return message.sendEmbed(new MessageEmbed()
				.setImage(emoteList[emoji].url)
				.setURL(emoteList[emoji].url)
				.setFooter("DiscordEmoji"));
		}
		const discordjsEmoteParse = Util.parseEmoji(emoji);
		if (discordjsEmoteParse.id === null) {
			var arg;
			if (emoji.length > 2) {
				arg = charFor(emoji.replace(/\ud83c[\udffb-\udfff]$/, ""));
			} else {
				arg = emoji;
			}
			var twemote = "http://twemoji.maxcdn.com/2/72x72/{basename}.png".replace("{basename}", basename(arg));
			const nodeFetch = await fetch(twemote).catch(() => {
				return message.sendMessage("<:excigmabot_failure:490319592477032448> | There was an error fetching the emote");
			});

			if (nodeFetch.status !== 404) {
				return message.channel.sendFile(twemote);
			}


		}
		const filter1 = sentEmote => sentEmote.id.toLowerCase() === discordjsEmoteParse.id;
		const emote1 = message.guild.emojis.filter(filter1).first() || this.client.emojis.filter(filter1).first();
		if (emote1 !== null && emote1 !== undefined) {
			return message.channel.sendFile(emote1.url)
		}

		const filter2 = sentEmote => sentEmote.name.toLowerCase() === discordjsEmoteParse.name;
		const emote2 = message.guild.emojis.filter(filter2).first() || this.client.emojis.filter(filter2).first();
		if (emote2) {
			return message.channel.sendFile(emote2.url)
		}
		return message.sendMessage("<:excigmabot_failure:490319592477032448> | That is not a valid emote.");
	}
};
function charFor(type) {
	var newChar;
	if (type in twemojiList) {
		newChar = twemojiList[type].char;
	} else {
		newChar = "\uFFFD";
	}
	return newChar;
}
