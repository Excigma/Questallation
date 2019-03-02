const { Inhibitor } = require(`${process.cwd()}/src/index`);

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: true });
    }

    async run(msg, cmd) {
        if (cmd.requireMusic !== true) return;

        if (msg.channel.type !== "text") throw `${this.client.emotes.cross} This command may be only executed in a server.`;

        if (!msg.member.voice.channel) throw `${this.client.emotes.cross} You are not connected in a voice channel.`;
        if (!msg.guild.me.voice.channel) throw `${this.client.emotes.cross} I am not connected in a voice channel.`;
        if (msg.member.voice.channel !== msg.guild.me.voice.channel) throw `${this.client.emotes.spin}You must be in the same voice channel as me.`;
    }

};
