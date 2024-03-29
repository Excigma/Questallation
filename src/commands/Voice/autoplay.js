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
            `${this.client.emotes.tick} | Autoplay is turned on` :
            `${this.client.emotes.tick} | Autoplay is turned off`);
    }

};
