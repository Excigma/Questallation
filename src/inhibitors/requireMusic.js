const { Inhibitor } = require(`${process.cwd()}/src/index`);

module.exports = class extends Inhibitor {

    constructor(...args) {
        super(...args, { spamProtection: true });
    }

    async run(msg, cmd) {
        if (cmd.requireMusic !== true) return;

        if (msg.channel.type !== "text") throw "<:Questallation_warn:490319593274081280> | This command may be only executed in a server.";

        if (!msg.member.voice.channel) throw "<a:ExcigmaCross:534470159604383744> | You are not connected in a voice channel.";
        if (!msg.guild.me.voice.channel) throw "<:Questallation_warn:490319593274081280> | I am not connected in a voice channel.";
        if (msg.member.voice.channel !== msg.guild.me.voice.channel) throw "<:Questallation_warn:490319593274081280> | You must be in the same voice channel as me.";
    }

};
