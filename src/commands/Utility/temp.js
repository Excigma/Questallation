ebeval
const Jimp = require("jimp");
for (const role in message.guild.roles) {
    const canvas = await new Jimp(64, 64, Jimp.cssColorToHex(role.color));
    const rgb = Jimp.intToRGBA(Jimp.cssColorToHex(role.color));
    canvas.getBuffer("image/png", async function(err, buffer) {
        message.sendEmbed(new MessageEmbed()
            .setDescription(`Your HEX code was \`${hex}\`, and the RGB is \`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})\``)
            .attachFiles([new MessageAttachment(buffer, "color.png")])
            .setThumbnail("attachment://color.png"), "Here you go!");
    });
}