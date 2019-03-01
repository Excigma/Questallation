const { MusicCommand, util: { splitText, showSeconds } } = require(`${process.cwd()}/src/index`);
const { MessageEmbed } = require("discord.js");
const getInfo = require("util").promisify(require("ytdl-core").getInfo);

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, { description: "Get information from the current song." });
    }

    async run(msg) {
        const { remaining, queue, playing } = msg.guild.music;
        if (!playing) throw `<a:ExcigmaCross:534470159604383744> | No song is playing right now`;

        const [song] = queue;
        const info = await getInfo(song.url);
        if (!info.author) info.author = {};

        return msg.sendEmbed(new MessageEmbed(msg.excigmaEmbed)
            .setTitle(info.title)
            .setURL(`https://youtu.be/${info.vid}`)
            .setAuthor(info.author.name || "Unknown", info.author.avatar || null, info.author.channel_url || null)
            .setDescription([
                `**Duration**: ${showSeconds(parseInt(info.length_seconds) * 1000)} [Time remaining: ${showSeconds(remaining)}]`,
                `**Description**: ${splitText(info.description, 500)}`
            ].join("\n\n"))
            .setThumbnail(info.thumbnail_url)
            .setTimestamp());
    }

};
