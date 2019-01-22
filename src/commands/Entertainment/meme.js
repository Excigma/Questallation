const { Command, MessageEmbed } = require(`${process.cwd()}/src/index`);
const fetch = require("node-fetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            permissionLevel: 0,
            description: "Get a random meme",
            extendedHelp: "Gets a random meme from reddit"
        });
    }

    async run(message) {
        const body = await fetch(`https://www.reddit.com/r/${[
			"wholesomememes",
			"onlywholesomememes",
			"dankmemes",
			"wholesomememes",
			"memes",
			"MemeEconomy",
			"meirl",
			"Me_irl",
			"holdmybeer",
			"facepalm",
			"CrappyDesign",
			"onejob",
			"trippinthroughtime",
			"MildlyVandalised",
			"mildlyinteresting",
			"fffffffuuuuuuuuuuuu"
		].random()}/random.json`).then(res => res.json());

        if (!body[0].data.children[0].data.preview.images[0].source.url) return this.store.get("meme").run(message)
        if (body[0].data.children[0].data.over_18 && !message.channel.nsfw) return this.store.get("meme").run(message)


        message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
            .setTitle(body[0].data.children[0].data.title)
            .setURL(body[0].data.children[0].data.preview.images[0].source.url)
            .setColor("#7289da")
            .setImage(body[0].data.children[0].data.preview.images[0].source.url)
        );
    }
};