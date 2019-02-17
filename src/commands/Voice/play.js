const { MusicCommand, klasaUtil: { sleep } } = require(`${process.cwd()}/src/index`);

module.exports = class extends MusicCommand {

    constructor(...args) {
        super(...args, { description: "Starts playing the songs in the queue" });
    }

    async run(msg) {
        const { music } = msg.guild;

        if (!music.queue.length) { return msg.sendMessage(`<:Questallation_warn:490319593274081280> | The queue is empty, add new songs with \`${msg.guild.settings.prefix}add\`.`); }

        if (!music.voiceChannel) await this.store.get("join").run(msg);

        if (music.playing) {
            return msg.sendMessage("<:Questallation_warn:490319593274081280> | I am already playing music");
        } else if (music.paused) {
            music.resume();
            return msg.sendMessage(`<a:ExcigmaTick:534470159465971722> | Resumed, now playing: **${music.queue[0].title}**`);
        } else {
            music.channel = msg.channel;
            return this.play(music);
        }
    }

    async play(music) {
        while (music.queue.length) {
            const [song] = music.queue;
            await music.channel.send(`<a:ExcigmaTick:534470159465971722> | Playing: **${song.title}** as requested by: **${song.requester}**`);
            await sleep(300);

            try {
                if (!await new Promise(async (resolve) => {
                        (await music.play())
                        .on("end", () => {
                                music.skip();
                                resolve(true);
                            })
                            .on("error", (err) => {
                                music.channel.send("<a:ExcigmaCross:534470159604383744> | An unexpected error occured");
                                music.client.emit("error", err);
                                music.skip();
                                resolve(true);
                            })
                            .once("disconnect", () => {
                                resolve(false);
                            });
                    })) return;

                // Autofetch if the autoplayer is enabled
                if (!music.queue.length && music.autoplay) await this.autoPlayer(music);
            } catch (error) {
                this.client.emit("error", error);
                music.channel.send(error);
                music.leave();
                break;
            }
        }

        if (!music.queue.length) {
            music.channel.send("<a:ExcigmaTick:534470159465971722> | There are no more songs, I will now leave the voice channel")
                .then(() => music.leave());
        }
    }

    autoPlayer(music) {
        return music.add("YouTube AutoPlay", music.next);
    }

};
