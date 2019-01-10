const { Command } = require('klasa');

const binary = (str) => {
    var binString = '';
    str.split(' ').map(function (bin) {
        binString += String.fromCharCode(parseInt(bin, 2));
    });
    return binString;
}

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'Makes words from binary.',
            usage: '<Text:str>',
            extendedHelp: 'This command changed binary back to unicode.'
        });
    }

    async run(message, [str]) {
        message.sendEmbed({
            title: 'Binary text',
            color: 0x7289DA,
            author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL()
            },
            description: binary(str)
        })

    }

};
