const { Command, version: klasaVersion } = require(`${process.cwd()}/src/index`);
const { version: discordVersion } = require("discord.js");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["details", "what"],
            guarded: true,
            description: language => language.get("COMMAND_INFO_DESCRIPTION")
        });
    }

    async run(message) {
        return message.sendMessage(`I am a project maintained by Excigma, otherwise known as Excigma#0321.

I am ExcigmaBot, I started as a tiny bot that provided some utility commands, and some fun commands for my developer's server.
Later on, my developer decided to work on me to have more fun commands. After a few friends wanted to me on thier servers, my developer changed the bot completely, and gave me a new name; ExcigmaBot. I have joined many new servers, and grown since, to what you see me today.

I am made using Klasa master (v${klasaVersion}), and Discord.js (v${discordVersion}) and I'm run on a node.js server.

PS: If I ever go offline, just type https://excigmabot.glitch.me and I'll be back!`);
    }
};
