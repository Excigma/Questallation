const { Command } = require('klasa');

const converter = (str) => Array(str.length).fill(true).map((_, i) => !i || i === str.length - 1 ? !i ? str.split('').join(' ') : str.split('').reverse().join(' ') : str[i] + ' '.repeat(str.length * 2 - 3) + str[str.length - 1 - i]).join('\n');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['box'],
            description: 'Makes your text into a box',
            usage: '<Text:str{1,30}>',
            extendedHelp: 'This command puts what you send into a box'
        });
    }

    async run(message, [str]) {
        message.sendEmbed({
            title: 'Memebox',
            color: 0x7289DA,
            author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL()
            },
            description: `\`\`\`${converter(str)}\`\`\``
        })

    }
};
