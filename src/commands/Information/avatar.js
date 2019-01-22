const { Command, MessageEmbed } = require(`${process.cwd()}/src/index`);


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            description: "Shows the avatar of the author or a mentioned user",
            extendedHelp: ["", "@Excigma#0 321"],
            usage: "[User:user]"
        });
    }

    async run(message, [user = message.author]) {
        await message.send("Requesting avatar...");
        user = await this.client.users.fetch(user.id);
        message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
            .setTitle("Click here if image doesn't load")
            .setURL(user.displayAvatarURL({ size: 2048 }))
            .setImage(user.displayAvatarURL({ size: 2048 }))
            .setDescription(`Your requested avatar of ${user.tag}:`)
        );
    }
};