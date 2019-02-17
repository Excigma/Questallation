const Discord = require("discord.js");
const client = new Discord.Client();
const TOKEN = "no";
const prefix = "s!";

client.on("message", async (message) => {
    if (message.content.startsWith(`${prefix}help`)) {
        var embed = new Discord.RichEmbed()
            .setColor(0x3498DB)
            .setAuthor(client.user.username, client.user.avatarURL)
            .setTitle("Help Menu")
            .setDescription("The Help Menu for Sigma")
            .addField("**Help**", "This command shows the help menu.")
            .addField("**Flip**", "Flips a coin.")
            .addFiled("**Support Server**", "Click [here](https://discord.gg/) for the support server")
            .setTimestamp()
            .setFooter("Created by brickman#4669", client.user.avatarURL);
        message.channel.send(embed);
    } else if (message.content.startsWith(`${prefix}flip`)) {
        message.channel.send(Math.floor(Math.random() * 2) === 0 ? "Heads" : "Tails");
    } else if (message.content.startsWith(`${prefix}roll`)) {
        message.channel.send(`You rolled the number ${Math.floor(Math.random() * 6) + 1}`);
    } else if (message.content.startsWith(`${prefix}newcommands`)) {
        // Code here
    } else if (message.content.startsWith(`${prefix}othercommands`)) {
        // Code here
    } else if (message.content.startsWith(`${prefix}example`)) {
        // Code here
    } else if (message.content.startsWith(`${prefix}moreexamples`)) {
        // Yes
    }
});

client.on("ready", () => {
    console.log(`Bot is up and ready! Connected as ${client.user.tag}`);
});

client.login(TOKEN);
