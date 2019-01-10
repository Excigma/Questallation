const { MusicCommand } = require(`${process.cwd()}/src/index`);
const fetch = require("node-fetch");
const qs = require("querystring");

const URL = "https://www.googleapis.com/youtube/v3/search?";

module.exports = class extends MusicCommand {

	constructor(...args) {
		super(...args, {
			description: "Adds a song the the queue.",
			usage: "<url:string>",
			extendedHelp: ["Some song"]
		});
	}

	async run(msg, [url]) {
		const youtubeURL = await this.getURL(url);
		if (!youtubeURL) throw "<:excigmabot_failure:490319592477032448> | Not found.";

		const { music } = msg.guild;
		const song = await music.add(msg.author, youtubeURL);

		return msg.sendMessage(`<:excigmabot_success:490319592615575553> |  Added **${song.title}** to the queue`);
	}

	async getURL(url) {
		const id = MusicCommand.YOUTUBE_REGEXP.exec(url);
		if (id) return `https://youtu.be/${id[1]}`;

		const query = qs.stringify({
			part: "snippet",
			q: url,
			key: process.env.GOOGLE_SEARCH
		});
		const { items } = await fetch(URL + query)
			.then(result => result.json());

		const video = items.find(item => item.id.kind === "youtube#video");
		return video ? `https://youtu.be/${video.id.videoId}` : null;
	}

};
