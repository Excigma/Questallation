const { Structures } = require("discord.js");
const MusicManager = require("./MusicManager");

module.exports = Structures.extend("Guild", Guild => {
	class ExcigmaGuild extends Guild {
		constructor(...args) {
			super(...args);
			this.music = new MusicManager(this);
		}
	}
	return ExcigmaGuild;
});
