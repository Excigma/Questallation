const { Task } = require(`${process.cwd()}/src/index`);
const fetch = require("node-fetch");
const { writeJSONAtomic } = require("fs-nextra");


module.exports = class extends Task {

    async run() {
        var emojis = {};
        const body = await fetch("https://discordemoji.com/api").then(res => res.json());
        if (!body) throw "There was an error, please try again later.";
        for (var entry of body) {
            emojis[entry.title.toLowerCase()] = {
                url: entry.image
            };
        }
        writeJSONAtomic(`${process.cwd()}/src/modules/emojis.json`, emojis);
    }
};