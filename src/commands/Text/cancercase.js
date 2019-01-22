const { Command } = require('klasa');


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'CAncERcAse.',
            usage: '<Text:str>',
            extendedHelp: 'THiS CommANd DoEs thiS tO youR TexT AhHHhhHHhHHHHHHHhHhHHh'
        });
    }

    async run(message, [str]) {
        let cancer = ""
        const splitStr = str.split("")
        for (const char of splitStr) {
            cancer += [char.toLowerCase(), char.toUpperCase()].random()
        }
        return this.sendText(message, cancer);
    }
};