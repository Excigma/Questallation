const { get } = require('snekfetch');
const { Command } = require('klasa');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'This command will give you a very bad pun.',
            extendedHelp: 'This command gets a pun from getpuns.herokuapp.com.'
        });
    }

    async run(message) {
        message.sendMessage(`<a:typing:434472906970628096> **${message.guild.me.displayName}** is finding a pun...`);
        const { text } = await get('https://getpuns.herokuapp.com/api/random');
        if (!JSON.parse(text).Pun) return message.response('Oh no there was an error, try again later.')
        message.sendMessage(JSON.parse(text).Pun)
    }

};
