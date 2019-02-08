const { Command } = require(`${process.cwd()}/src/index`);
var { PassThrough } = require("stream");
const qs = require("querystring");
const fetch = require("node-fetch");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            enabled: true,
            runIn: ["text"],
            description: "Tries it's best to change text into speech, which is read out into the voice channel you're in",
            extendedHelp: ["Hello world"],
            usage: "<Text:str{1,1000}>",
            usageDelim: " || "
        });
        this.customizeResponse("Text", "Please give me something to say at least.");
    }

    async run(message, [str]) {
        if (!message.guild.music.voiceChannel) await this.store.get("join").run(message);
        try {
            await message.send(`Processing | ${message.author.tag}`);
            const body = await fetch(`http://tts.cyzon.us/tts?${qs.stringify({ text: str })}`).then(res => res.buffer());
            message.send(`Talking into ${message.guild.me.voice.channel.name} | ${message.author.tag} `);
            const dispatcher = await message.guild.me.voice.channel.connection.play(new PassThrough()
                .end(body), { volume: 4 });


            dispatcher.on("finish", () => {
                message.send(`Fineshed speaking ${str} | by ${message.author.tag} into ${message.guild.me.voice.channel.name}`);
            });
        } catch (e) {
            message.channel.send(`There is an error. It might be you Woz. Screw you Woz why do you break everything.\n${e}`);
        }
    }
};
