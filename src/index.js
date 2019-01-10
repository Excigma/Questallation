const klasa = require("klasa");

module.exports = {
	...klasa,
	MusicCommand: require("./lib/structures/MusicCommand"),
	MusicManager: require("./lib/MusicManager"),
	util: require("./lib/util/util"),
	klasaUtil: klasa.util
};
