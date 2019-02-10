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

        const post = body[0].data.children[0].data;
        if (!post.url) return this.store.get("meme").run(message);
        if (post.over_18 && !message.channel.nsfw) return this.store.get("meme").run(message);


        return message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
            .setTitle(post.title)
            .setURL(`https://reddit.com${post.permalink}`)
            .setImage(post.url)
        );
    }
};
