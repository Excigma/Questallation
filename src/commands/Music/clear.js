const { MusicCommand } = require(`${process.cwd()}/src/index`);

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            description: "Prune the queue list.",
            requireMusic: true
        });
    }

    async run(msg) {
        const { music } = msg.guild;

        if (music.voiceChannel.members.size > 2) {
            if (!await msg.hasAtLeastPermissionLevel(6)) return msg.send("<a:ExcigmaCross:534470159604383744> | You can't run this command if there is someone else in the voice channel unless you have manage server.");
        }

        music.prune();
        return msg.sendMessage(`<a:ExcigmaTick:534470159465971722> | Cleared ${music.queue.length} songs from the queue`);
    }

};