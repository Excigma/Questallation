const { Command } = require(`${process.cwd()}/src/index`);
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "Roll some dice.",
            extendedHelp: ["", "50", "500"],
            usage: "[faces:int{1,1000}]"
        });
    }

    async run(message, [faces = 6]) {
        message.send(`You've rolled ${Math.round(Math.random() * faces)} on a ${faces} sided die.`);
    }
};
