const { Command } = require(`${process.cwd()}/src/index`);
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "Answers a question, magic 8 ball style.",
            aliases: ["magic8"],
            extendedHelp: "This command answers some questions for you and predict the future!",
            usage: "<Question:str>",
            promptLimit: 1
        });
    }

    async run(message) {
        message.sendMessage(["Maybe.",
            "Certainly not.",
            "I hope so.",
            "Not in your wildest dreams.",
            "There is a good chance.",
            "Quite likely.",
            "I think so.",
            "I hope not.",
            "I hope so.",
            "Never!",
            "Fuhgeddaboudit.",
            "Ahaha! Really?!?",
            "Pfft.",
            "Sorry, bucko.",
            "Hell, yes.",
            "Hell to the no.",
            "The future is bleak.",
            "The future is uncertain.",
            "I would rather not say.",
            "Who cares?",
            "Possibly.",
            "Never, ever, ever.",
            "There is a small chance.",
            "Yes!",
            "Does money grow on tres? Ya wish",
            "No?",
            "Seems about as good as my nokia that has been put into the water"
        ].random());
    }

};
