const klasa = require("klasa");

module.exports = {
    ...klasa,
    MusicCommand: require("./lib/structures/MusicCommand"),
    MusicManager: require("./lib/structures/MusicManager"),
    AnimalCommand: require("./lib/structures/AnimalCommand"),
    CanvasCommand: require("./lib/structures/CanvasCommand"),
    util: require("./lib/util"),
    klasaUtil: klasa.util
};