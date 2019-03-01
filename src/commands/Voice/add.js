const { MusicCommand, MessageEmbed } = require(`${process.cwd()}/src/index`);
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
        const youtubeURL = await this.getURL(url, msg);
        if (!youtubeURL) throw "<a:ExcigmaCross:534470159604383744> | Not found.";


        const { music } = msg.guild;
        const song = await music.add(msg.author, youtubeURL);

        return msg.sendEmbed(new MessageEmbed(msg.excigmaEmbed)
            .setDescription(`Added **${song.title}** to the queue\n${song.seconds} seconds`)
            .setThumbnail(song.image));
    }

    async getURL(url, msg) {
        const id = MusicCommand.YOUTUBE_REGEXP.exec(url);
        if (id) return `https://youtu.be/${id[1]}`;

        const query = qs.stringify({
            part: "snippet",
            q: url,
            key: process.env.GOOGLE_SEARCH
        });
        const { items } = await fetch(URL + query)
            .then(result => result.json());

        const video = items.filter(item => item.id.kind === "youtube#video").slice(0, 10);
        let toplay = 0;
        if (video) {
            let text = "";
            let numbers = 0;
            for (const link of video) {
                numbers++;
                text += `[${numbers}] ${link.snippet.channelTitle} | ${link.snippet.title}\n`;
            }

            const number = await msg.awaitReply(`Choose a number between 1 and ${numbers}`, new MessageEmbed(msg.excigmaEmbed).setDescription(text));
            if (number < 0 || number > numbers) {
                msg.channel.send(`${this.client.emotes.cross} | Invalid song, playing first song`);
            } else {
                toplay = number - 1;
            }
        }

        return video ? `https://youtu.be/${video[toplay].id.videoId}` : null;
    }

};
