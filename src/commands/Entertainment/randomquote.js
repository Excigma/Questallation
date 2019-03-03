const fetch = require("node-fetch");
const { Command } = require(`${process.cwd()}/src/index`);

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "This command find a quote"
        });
    }

    async run(message) {
        const quote = await fetch("http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en").then(res => res.json());
        if (quote.quoteText < 1) throw "An error occurred. Try again later";
        message.sendEmbed({
            color: 0x7289DA,
            title: "Quote",
            url: quote.quoteLink,
            author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL()
            },
            fields: [{
                    name: "Quote",
                    value: quote.quoteText
                },
                {
                    name: "Author",
                    value: quote.quoteAuthor
                }
            ]
        });
    }

};
