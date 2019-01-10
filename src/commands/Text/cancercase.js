const { Command } = require('klasa');

const converter = (string) => {
    var cancer = []
    string.split('').forEach(c => cancer.push([c, c.toUpperCase()].random()))
    return cancer.join('')
};

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'CAncERcAse.',
            usage: '<Text:str>',
            extendedHelp: 'THiS CommANd DoEs thiS tO youR TexT AhHHhhHHhHHHHHHHhHhHHh'
        });
    }

    async run(message, [str]) {
        message.sendEmbed({
            title: 'Cancercase',
            color: 0x7289DA,
            author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL()
            },
            description: converter(str)
        })

    }
};
