const fetch = require("node-fetch");
const { Command } = require(`${process.cwd()}/src/index`);

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "This command will give you a very bad pun."
        });
    }

    async run(message) {
        const body = await fetch("https://getpuns.herokuapp.com/api/random").then(res => res.json());
        if (!body.Pun) throw "Something went wrong. Please try again later";
        return message.send(body.Pun);
    }

};
