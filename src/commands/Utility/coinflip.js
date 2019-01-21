const { Command } = require("klasa");
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "This command flips coins for you.",
            extendedHelp: ["", "5", "600"],
            usage: "[coins:int{1,1000}]"
        });
    }

    run(message, [coins = 0]) {
        if (coins > 1) {
            let heads = 0;
            let tails = 0;
            for (let i = 0; i < coins; i++) {
                if (Math.random() > 0.5) heads++;
                else tails++;
            }
            return message.send(`You flipped ${coins} coins. ${heads} ${heads === "1" ? "was" : "were"} heads, and ${tails} ${tails === "1" ? "was" : "were"} tails.`);
        }
        return message.send(`You flipped ${Math.random() > 0.5 ? "Heads" : "Tails"}.`);
    }
};