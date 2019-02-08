const { Task } = require(`${process.cwd()}/src/index`);
const { MessageEmbed } = require("discord.js");

module.exports = class extends Task {
    async run({ channel, user, text }) {
        const _channel = this.client.channels.get(channel);
        const _user = this.client.users.get(user);

        return _channel.send(`<@${user}>`, {
            embed: new MessageEmbed()
                .setAuthor(`${_user.tag},`, _user.displayAvatarURL())
                .setColor(0x7289DA)
                .setTitle("You asked me to remind you about: ")
                .setDescription(text)

        });
    }
};
