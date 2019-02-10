const { Command, MessageEmbed } = require(`${process.cwd()}/src/index`);
const fetch = require("node-fetch");
const HTMLParser = require("fast-html-parser");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, { description: "Gets a random FML story.", nsfw: true });
    }

    async run(msg) {
        const root = await fetch("http://www.fmylife.com/random")
            .then(result => result.text())
            .then(HTMLParser.parse);
        const article = root.querySelector(".block a");
        const downdoot = root.querySelector(".vote-down");
        const updoot = root.querySelector(".vote-up");

        if (article.childNodes[0].text.length < 5) {
            return this.store.get("fml").run(msg);
        }

        return msg.sendEmbed(new MessageEmbed(msg.excigmaEmbed)
            .setTitle(`Requested by ${msg.author.tag}`)
            .setDescription(`_${article.childNodes[0].text}\n\n_`)
            .addField("I agree, your life sucks", updoot.childNodes[0].text, true)
            .addField("You deserved it:", downdoot.childNodes[0].text, true));
    }

};
