const { Command, util } = require("klasa");
const fetch = require("node-fetch");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Random jokes that aren't funny at all."
        });
    }

    async run(message) {
        const body = await fetch("https://icanhazdadjoke.com", { method: "GET", headers: { Accept: "text/plain" } }).then(res => res.text());
        if (!body) throw "Something went wrong. Please try again later"
        message.send(body);
    }

};