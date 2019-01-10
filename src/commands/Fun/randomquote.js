const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'Returns a random message from someone in the channel.',
            requiredPermissions: ['READ_MESSAGE_HISTORY', 'EMBED_LINKS']
        });
    }

    async run(message) {
        let messageBank = await message.channel.messages.fetch({ limit: 100 });

        const msg = messageBank
            .filter(ms => !ms.author.bot && ms.content.replace(/[\W0-9]*/g, '').length >= 20)
            .random();

        if (!msg) throw 'Could not find a quote';

        return message.sendEmbed(new MessageEmbed()
            .setColor(0x7289DA)
            .setTitle('Random message by' + msg.author.tag)
            .setDescription(msg.content))
    }

};