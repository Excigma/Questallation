const { MusicCommand } = require(`${process.cwd()}/src/index`);

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            description: "Toggle the autoplayer.",
            extendedHelp: [],
            requireMusic: true
        });
    }

    async run(msg) {
        const { music } = msg.guild;
        const enabled = !music.autoplay;

        music.autoplay = enabled;

        return msg.sendMessage(enabled ?
            `<a:ExcigmaTick:534470159465971722> | Autoplay is turned on` :
            `<a:ExcigmaTick:534470159465971722> | Autoplay is turned off`);
    }

};