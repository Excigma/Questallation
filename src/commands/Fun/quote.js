const snekfetch = require('snekfetch')
const { Command } = require('klasa');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'This command will give you a very bad pun.',
            extendedHelp: 'This command gets a pun from getpuns.herokuapp.com.'
        });
    }

    async run(message) {
        message.sendMessage('<a:typing:434472906970628096> | Getting a quote...')
        const quote = await snekfetch.get('http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en')
        if (quote.body.length < 1) {
            return message.response('Oh no, an error occurred. Try again later')
        }
        message.sendEmbed({
            color: 0x7289DA,
            title: 'Quote',
            url: quote.body.quoteLink,
            author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL()
            },
            fields: [{
                name: 'Quote',
                value: quote.body.quoteText
            },
            {
                name: 'Author',
                value: quote.body.quoteAuthor
            }]
        })
    }

};
