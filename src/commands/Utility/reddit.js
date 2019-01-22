const { Command } = require(`${process.cwd()}/src/index`);
const fetch = require("node-fetch");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "When given a subreddit, it gives you a random post from the subreddit",
            usage: "<subreddit:str>",
            extendedHelp: ["memes", "dankmemes"]
        });
    }

    async run(msg, [subreddit]) {
        const data = await fetch(`https://www.reddit.com/r/${subreddit}/random.json`)
            .then(response => response.json())
            .then(body => {
                if (body.error) return msg.sendMessage(`<:excigmabot_warn:490319593274081280> |  A error has occured, but this seems to be on reddit's side:\n ${body.error}`);
                return body[0].data.children[0].data;
            })
            .catch((error) => {
                throw error;
            });

        if (data.over_18 && !msg.channel.nsfw) {
            return msg.sendMessage("<:excigmabot_warn:490319593274081280> |  I cant post a NSFW image in this channel unless you mark it as NSFW");
        }

        return msg.sendMessage(data.url);
    }

};