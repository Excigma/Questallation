const { TextCommand } = require(`${process.cwd()}/src/index`);
const binary = (string) => {
    return string.split("").map((char) => {
        return char.charCodeAt(0).toString(2);
    }).join(" ");
};

module.exports = class extends TextCommand {
    constructor(...args) {
        super(...args, {
            description: "Makes binary from words.",
            usage: "<Text:str>",
            extendedHelp: "This command changes a tring to binary."
        });
    }

    async run(message, [str]) {
        message.sendEmbed({
            title: "Binary",
            color: 0x7289DA,
            author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL()
            },
            description: binary(str)
        });

    }

};
