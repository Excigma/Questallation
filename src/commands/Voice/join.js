const { MusicCommand } = require(`${process.cwd()}/src/index`);
const { Permissions: { FLAGS } } = require("discord.js");

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            aliases: ["connect"],
            description: "Joins the message author's voice channel."
        });
    }

    async run(msg) {
        if (!msg.member) {
            await msg.guild.members.fetch(msg.author.id).catch(() => {
                throw "<a:ExcigmaCross:534470159604383744> | Error fetching member, maybe try waiting, or message someone else to try?";
            });
        }

        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel) throw "<a:ExcigmaCross:534470159604383744> | You are not connected in a voice channel.";
        if (msg.guild.music.playing) {
            const QuestallationChannel = msg.guild.music.voice.channel;
            if (voiceChannel.id === QuestallationChannel.id) throw "<a:ExcigmaTick:534470159465971722> | I have already joined the voice channel";
            throw "<a:ExcigmaCross:534470159604383744> | I'm being used in another voice channel so I can't join your channel.";
        }
        this.resolvePermissions(msg, voiceChannel);

        await msg.guild.music.join(voiceChannel);
        return msg.sendMessage(`<a:ExcigmaTick:534470159465971722> | Successfully joined the voice channel ${voiceChannel}`);
    }

    resolvePermissions(msg, voiceChannel) {
        if (voiceChannel.full) throw "<a:ExcigmaCross:534470159604383744> | Your voice channel is full, I can't join";

        const permissions = voiceChannel.permissionsFor(msg.guild.me);
        if (!permissions.has(FLAGS.CONNECT)) throw "<a:ExcigmaCross:534470159604383744> | I don't have permission to connect to the voice channel.";
        if (!permissions.has(FLAGS.SPEAK)) throw "<a:ExcigmaCross:534470159604383744> | I don't have permission to speak in the voice channel.";
    }

};
