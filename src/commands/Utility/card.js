const { Command } = require(`${process.cwd()}/src/index`);
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["♠️", "♦", "♥️", "♠️"];

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["randomcard"],
            description: "Draws some random cards from a deck.",
            extendedHelp: ["", "10"],
            usage: "[num:int{1,10}]"
        });
    }

    async run(message, [num = 1]) {
        const numCards = num;
        const lines = [];
        for (let i = 0; i < numCards; ++i) {
            lines.push(`**[${ranks[Math.floor(Math.random() * ranks.length)]}**${suits[Math.floor(Math.random() * suits.length)]}]`);
        }
        return message.sendMessage(lines.join(", "));
    }

};
