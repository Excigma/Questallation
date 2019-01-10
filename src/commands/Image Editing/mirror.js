const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js')
const Jimp = require('jimp')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'Mirror',
            extendedHelp: 'Mirrors your avatar.',
            usage: '[User:user]',
            usageDelim: ' ',
            cooldown: 10
        });
    }

    async run(message, [user = message.author]) {
        user = await this.client.users.fetch(user.id)

        const avatar = await Jimp.read(user.displayAvatarURL({ format: 'png', size: 512 }))
        avatar.mirror(true, true)
        avatar.getBuffer('image/png', async function (err, buffer) {
            message.sendMessage({ files: [new MessageAttachment(buffer, 'image.png')] })
        })
    }
};
