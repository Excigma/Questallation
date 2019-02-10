const { MusicCommand } = require(`${process.cwd()}/src/index`);

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            description: "Pauses the current song.",
            requireMusic: true
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        if (!music.playing) throw "<a:ExcigmaCross:534470159604383744> | Nothing is playing.";

        music.pause();
        return msg.sendMessage("<a:ExcigmaTick:534470159465971722> | Music has been paused");
    }

};
