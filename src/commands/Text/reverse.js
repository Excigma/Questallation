const { Command } = require("klasa");


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Alternates your case",
            usage: "<Text:str>",
            extendedHelp: "This command is based on the pOpUlAr MoCkInG meme."
        });
    }

    async run(message, [str]) {
        message.sendEmbed({
            title: "Reverse",
            color: 0x7289DA,
            author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL()
            },
            description: str.split("").reverse().join("")
        });

    }
};
