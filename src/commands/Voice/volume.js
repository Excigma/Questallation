const { MusicCommand, klasaUtil: { codeBlock } } = require(`${process.cwd()}/src/index`);

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            aliases: ["vol"],
            usage: "[control:string]",
            description: "Manage the volume for current song.",
            requireMusic: true
        });
    }

    async run(msg, [vol]) {
        const { dispatcher, playing } = msg.guild.music;
        if (!playing) return msg.send("<a:ExcigmaCross:534470159604383744> | There is nothing playing");

        if (!vol) return msg.sendMessage(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
        if (/^[+]+$/.test(vol)) {
            if (Math.round(dispatcher.volume * 50) >= 100) return msg.sendMessage(`<a:ExcigmaTick:534470159465971722> | Volume: ${Math.round(dispatcher.volume * 50)}%`);
            dispatcher.setVolume(Math.min(((dispatcher.volume * 50) + (2 * (vol.split("+").length - 1))) / 50, 2));
            return msg.sendMessage(`${dispatcher.volume === 2 ? "Max" : "🔊"} Volume: ${Math.round(dispatcher.volume * 50)}%`);
        }

        if (/^[-]+$/.test(vol)) {
            if (Math.round(dispatcher.volume * 50) <= 0) return msg.sendMessage(`🔇 Volume: ${Math.round(dispatcher.volume * 50)}%`);
            dispatcher.setVolume(Math.max(((dispatcher.volume * 50) - (2 * (vol.split("-").length - 1))) / 50, 0));
            return msg.sendMessage(`<a:ExcigmaTick:534470159465971722> | ${dispatcher.volume === 0 ? "Muted" : "🔉"} Volume: ${Math.round(dispatcher.volume * 50)}%`);
        }

        return msg.sendMessage("Please run the help command for this command to see how to use it");
    }

};
