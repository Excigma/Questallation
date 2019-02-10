const { MusicCommand } = require(`${process.cwd()}/src/index`);

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            usage: "[force]",
            description: "Skip the current song.",
            requireMusic: true
        });
    }

    async run(msg, [force]) {
        const { music } = msg.guild;

        if (music.voiceChannel.members.size > 3) {
            if (force) {
                if (!await msg.hasAtLeastPermissionLevel(5)) return msg.send("<a:ExcigmaCross:534470159604383744> | You can't force skip unless you have manage server");
            } else {
                const response = this.handleSkips(music, msg.author.id);
                if (response) return msg.sendMessage(response);
            }
        }

        await msg.sendMessage(`<a:ExcigmaTick:534470159465971722> | Skipped ${music.queue[0].title}`);
        music.skip(true);
        return null;
    }

    handleSkips(musicInterface, user) {
        if (!musicInterface.queue[0].skips) musicInterface.queue[0].skips = new Set();
        if (musicInterface.queue[0].skips.has(user)) return "<:excigmabot_warn:490319593274081280> | You have already voted to skip this song.";
        musicInterface.queue[0].skips.add(user);
        const members = musicInterface.voiceChannel.members.size - 1;
        return this.shouldInhibit(members, musicInterface.queue[0].skips.size);
    }

    shouldInhibit(total, size) {
        if (total <= 2) return true;
        return size >= total * 0.4 ? false : `<:excigmabot_warn:490319593274081280> | | Skip votes: ${size} of ${Math.ceil(total * 0.4)}`;
    }

};
