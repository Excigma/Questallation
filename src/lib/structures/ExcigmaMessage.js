const { Structures } = require("discord.js");

module.exports = Structures.extend("Message", Message => class extends Message {
    constructor(...args) {
        super(...args);
        this.excigmaEmbed = {
            "author": {
                "name": this.author.tag,
                "url": this.author.displayAvatarURL(),
                "iconURL": this.author.displayAvatarURL()
            },
            "color": this.client.production ? 0x7289DA : 0xBE8D35,
            "timestamp": Date.now()
        }
    }
})