const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js')
const Jimp = require('jimp')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'Greyscale',
            extendedHelp: 'Changes your avatar to black and white.',
            usage: '[User:user]',
            usageDelim: ' ',
            cooldown: 10
        });
    }

    async run(message, [user = message.author]) {
        user = await this.client.users.fetch(user.id)

        const avatar = await Jimp.read(user.displayAvatarURL({ format: 'png', size: 512 }))
        avatar.greyscale()
        avatar.getBuffer('image/png', async function (err, buffer) {
            message.sendMessage({ files: [new MessageAttachment(buffer, 'image.png')] })
        })
    }
};
