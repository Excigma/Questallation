const { Command } = require(`${process.cwd()}/src/index`);
const { MessageEmbed } = require("discord.js");


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            description: "Shows the server's icon",
            extendedHelp: [""]
        });
    }

    async run(message, ) {
        await message.send("Requesting avatar...");
        message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
            .setTitle("Click here if image doesn't load")
            .setURL(message.guild.iconURL({ size: 2048 }))
            .setImage(message.guild.iconURL({ size: 2048 }))
            .setDescription(`Server icon`)
        );
    }
};
