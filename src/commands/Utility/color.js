const { Command } = require(`${process.cwd()}/src/index`);
const { MessageAttachment, MessageEmbed } = require("discord.js");
const Jimp = require("jimp");
const tinycolor = require("tinycolor2")

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            requiredPermissions: ["ATTACH_FILES", "EMBED_LINKS"],
            aliases: ["colour"],
            description: "Sends info about a hex color, or generates a random color.",
            extendedHelp: ["", "#7289DA"],
            usage: "[Color:str{,50}]"
        });
    }

    async run(message, [color]) {
        const isRandom = !tinycolor(color).isValid()
        const tcolor = await tinycolor(color).isValid() ? await tinycolor(color) : await tinycolor.random()
        const canvas = await new Jimp(200, 50, tcolor.toHexString());
        const buffer = await canvas.getBufferAsync("image/png")
        message.sendEmbed(new MessageEmbed(message.excigmaEmbed)
            .setTitle(isRandom ? `A random was generated ${tcolor.toName() || tcolor.toHexString()}` : `Your color of ${tcolor.toName()|| tcolor.toHexString()}`)
            .setDescription(`**Hex:** ${tcolor.toHexString()}\n**RGB:** ${tcolor.toRgbString()}\n**RGB %:** ${tcolor.toPercentageRgbString()}\n**CMYK:** cmyk(${this.cmyk(tcolor.toRgb()).map(c => Math.round(c))})\n**HSL:** ${tcolor.toHslString()}\n**HSV:** ${tcolor.toHsvString()}\n**Luminance:** ${(tcolor.getLuminance()*100).toString().substring(0, 5)}% Approx.`)
            .attachFiles([new MessageAttachment(buffer, "color.png")])
            .setImage("attachment://color.png"));
    }

    cmyk(rgb) {
        var r = rgb.r / 255;
        var g = rgb.g / 255;
        var b = rgb.b / 255;
        var c;
        var m;
        var y;
        var k;

        k = Math.min(1 - r, 1 - g, 1 - b);
        c = (1 - r - k) / (1 - k) || 0;
        m = (1 - g - k) / (1 - k) || 0;
        y = (1 - b - k) / (1 - k) || 0;
        return [c * 100, m * 100, y * 100, k * 100];
    };
};