const { Structures } = require("discord.js");

module.exports = Structures.extend("Message", Message => class extends Message {
    constructor(...args) {
        super(...args);
        this.excigmaEmbed = {
            author: {
                name: this.author.tag,
                url: this.author.displayAvatarURL(),
                iconURL: this.author.displayAvatarURL()
            },
            color: this.client.production ? 0x7289DA : 0xFFA500,
            timestamp: Date.now()
        };
    }
    async awaitReply(question, embed) {
        await (embed ? this.send(question, { embed }) : this.send(question));
        return this.channel.awaitMessages(message => message.author.id === this.author.id,
            { max: 1, time: 60000, errors: ["time"] })
            .then(messages => messages.first().content)
            .catch(() => false);
    }
});
