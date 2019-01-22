var asciify = require("asciify-image");
const { Command } = require(`${process.cwd()}/src/index`);
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Changes your avatar into text",
            extendedHelp: ["", "@Excigma#0321"],
            usage: "[User:user]",
            aliases: [],
            cooldown: 10
        });
    }

    async run(message, [user = message.author]) {
        asciify(user.displayAvatarURL({ format: "png", size: 512 }), {
                fit: "box",
                width: 20,
                height: 20,
                color: false
            })
            .then((asciified) => {
                message.send(`\`\`\`${asciified}\`\`\``, { split: true })
            })
            .catch((err) => {
                console.error(err);
            });

    }
};