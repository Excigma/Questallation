const { Command } = require(`${process.cwd()}/src/index`);
const fetch = require("node-fetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["haste"],
            description: "Upload code or text to hastebin.",
            usage: "<Code:str>",
            extendedHelp: ["//Some code...?", "/* Or some other code */"]
        });
    }

    async run(msg, [code]) {
        const key = await fetch("https://hastebin.com/documents", { method: "POST", body: code })
            .then(response => response.json())
            .then(body => body.key);
        return msg.sendMessage(`Your code has been uploaded here: https://hastebin.com/${key}`);
    }

};