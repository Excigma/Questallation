const { MusicCommand } = require(`${process.cwd()}/src/index`);

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, {
            description: "Resumes the current song.",
            requireMusic: true
        });
    }

    async run(msg) {
        if (msg.guild.music.idling) return msg.send(`${this.client.emotes.cross} The queue is empty`);
        if (msg.guild.music.playing) return msg.send(`${this.client.emotes.cross} Already playing`);

        msg.guild.music.resume();
        return msg.sendMessage("<a:ExcigmaTick:534470159465971722> | Song resumed");
    }

};
