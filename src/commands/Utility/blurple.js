const { Command, Stopwatch } = require(`${process.cwd()}/src/index`);
const Discord = require("discord.js");
const Jimp = require("jimp");


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Converts your profile picture to the one for the Project Blurple event.",
            extendedHelp: ["", "@Excigma#0321", "@Excigma#0321 true"],
            usage: "[User:user] [DarkBlurple:boolean]",
            usageDelim: " ",
            cooldown: 10
        });
    }

    async run(message, [user = message.author, DarkBlurple = false]) {
        const stopwatch = new Stopwatch();

        message.channel.send("Fetching image...");
        Jimp.read(user.displayAvatarURL({ format: "png", size: 512 }), async (err, image) => {
            if (err) {
                return message.sendMessage("<a:ExcigmaCross:534470159604383744> | There was an error.");
            }

            var levels = {
                128: [114, 137, 218],
                255: [255, 255, 255]
            };
            if (DarkBlurple === true) {
                levels["64"] = [78, 93, 148];
            }

            await message.channel.send(`Image processing code courtesy of tehZevo#0321
Modified by UniQMG#0522

Processing image... this may take some time.`);
            await image
                .greyscale()
                .scan(0, 0, image.bitmap.width, image.bitmap.height, async function (x, y, idx) {
                    var red = this.bitmap.data[idx + 0];
                    var green = this.bitmap.data[idx + 1];
                    var blue = this.bitmap.data[idx + 2];
                    var alpha = 255;
                    var keys = Object.keys(levels);
                    for (var i = 0; i < keys.length; i++) {
                        if (red < keys[i]) {
                            var c = levels[keys[i]];
                            red = c[0];
                            green = c[1];
                            blue = c[2];
                            break;
                        }
                    }
                    this.bitmap.data[idx + 0] = red;
                    this.bitmap.data[idx + 1] = green;
                    this.bitmap.data[idx + 2] = blue;
                    this.bitmap.data[idx + 3] = alpha;
                })
                .getBuffer("image/png", async (err, buffer) => {
                    message.channel.send({ files: [new Discord.MessageAttachment(buffer, "image.png")] });
                    message.channel.send(`Hmm that took ${stopwatch.toString()}`);
                    stopwatch.stop();
                });
        });
    }
};

/*
await message.channel.send(`Processing image... invert set to ${invert}`)
await image.scaleToFit(1024, 1024).greyscale().contrast(1)
if (invert == true) await image.invert()
await message.channel.send('Applying color, this may take a while...')
image.color([{ apply: 'red', params: [114] }, { apply: 'green', params: [137] }, { apply: 'blue', params: [218] }]).getBuffer('image/png', async function (err, buffer) {
    message.channel.send({ files: [new Discord.MessageAttachment(buffer, 'image.png')] })
    message.channel.send(`Hmm that took ${stopwatch.toString()}`)
    stopwatch.stop();
})
*/
