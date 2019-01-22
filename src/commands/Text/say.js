const { Command } = require(`${process.cwd()}/src/index`);


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Alternates your case",
            usage: "<Text:str>",
            extendedHelp: "This command sends text in an embed"
        });
    }

    async run(message, [str]) {
        message.sendEmbed({
            title: "Say",
            color: 0x7289DA,
            author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL()
            },
            description: str
        });

    }
};