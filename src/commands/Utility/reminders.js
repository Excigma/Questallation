const { Command, Duration, RichDisplay } = require(`${process.cwd()}/src/index`);
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            subcommands: true,
            description: "List or edit your reminders.",
            extendedHelp: ["list", "delete vk78izy6"],
            usage: "<list|delete> [ID:str]",
            usageDelim: " "
        });
        this.createCustomResolver("ID", (arg, possible, message, [action]) => {
            if (action === "delete" || arg) return arg;
            throw message.language.get("COMMAND_CONF_NOKEY");
        });
    }

    async list(message) {
        const reminders = this.client.schedule.tasks.filter(r => r.data.user === message.author.id);
        const Display = new RichDisplay();

        reminders.forEach(r => {
            Display.addPage(new MessageEmbed()
                .setAuthor(message.author.username + ",", message.author.displayAvatarURL())
                .setColor(0x7289DA)
                .setTitle(`Reminders - ${r.id}, in ${Duration.toNow(r.time)}`)
                .setDescription(r.data.text));
        });
        return Display.run(await message.send("Loading reminders"));
    }

    async delete(message, ID) {
        const reminders = this.client.schedule.tasks.filter(r => r.data.user === message.author.id);
        const reminder = reminders.filter(r => r.id == ID)[0];
        await message.sendEmbed(new MessageEmbed()
            .setTitle(`Task ID ${ID} deleted successfully.`)
            .setDescription(reminder.data.text));
        reminder.delete();
    }
};