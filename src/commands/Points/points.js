const { Command } = require(`${process.cwd()}/src/index`);

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Check your current level and points.",
            usage: "[User:user]",
            aliases: ["level", "rank"]

        });
    }

    run(message, [user = message.author]) {
        return message.send(`${user.tag} is currently level ${user.settings.level || "0"}, with ${user.settings.experience || "0"} points`);
    }
};
