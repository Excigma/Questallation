const { Command } = require(`${process.cwd()}/src/index`);
const { eval, number } = require("mathjs");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["math", "calc", "calculate"],
            usage: "<Expression:str>",
            description: "Does your math homework for you. Evaluate simple maths problems.",
            extendedHelp: ["1+1", "9+10", "12\\*14", "(3\\*7+10)^10+69"]
        });
    }

    async run(message, Expression) {
        var answer;
        try {
            answer = number(eval(Expression)).toString();
        } catch (e) {
            answer = "Invalid expression";
        }
        message.sendEmbed({
            color: 0x7289DA,
            author: {
                name: message.author.tag,
                icon_url: message.author.avatarURL()
            },
            description: answer
        });
    }
};