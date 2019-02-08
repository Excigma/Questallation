const { Structures } = require("discord.js");
const MusicManager = require("./MusicManager");

module.exports = Structures.extend("Guild", Guild => class extends Guild {
    constructor(...args) {
        super(...args);
        this.music = new MusicManager(this);
    }
});
