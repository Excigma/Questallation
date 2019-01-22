const klasa = require("klasa")
const { MessageEmbed, MessageAttachment } = require("discord.js")

module.exports = {
    //Export klasa
    ...klasa,
    //Commands
    MusicCommand: require("./lib/structures/MusicCommand"),
    MusicManager: require("./lib/structures/MusicManager"),
    AnimalCommand: require("./lib/structures/AnimalCommand"),
    CanvasCommand: require("./lib/structures/CanvasCommand"),
    TextCommand: require("./lib/structures/TextCommand"),
    //D.js stuff
    MessageEmbed: MessageEmbed,
    MessageAttachment: MessageAttachment,
    //Misc
    util: require("./lib/util"),
    klasaUtil: klasa.util
};