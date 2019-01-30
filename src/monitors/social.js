const { Monitor } = require("klasa");
const { Collection } = require("discord.js");
const pointCooldown = new Collection();
module.exports = class extends Monitor {
    constructor(...args) {
        super(...args, {
            ignoreOthers: false
        });
    }

    async run(message) {
        if (!message.guild) return;

        if (!pointCooldown.get(message.author.id + message.guild.id)) {
            pointCooldown.set(message.author.id + message.guild.id, Date.now());
        } else {
            if (Date.now() - 60000 < pointCooldown.get(message.author.id + message.guild.id)) return;
            pointCooldown.delete(message.author.id + message.guild.id);
        }


        const unextValue = message.author.settings.experience + 10;
        const unextLevel = Math.floor(0.1 * Math.sqrt(unextValue + 10));
        await message.author.settings.update([["experience", unextValue], ["level", unextLevel]]);

        const mnextValue = message.member.settings.experience + 10;
        const mcurrentLevel = message.member.settings.level;
        const mnextLevel = Math.floor(0.1 * Math.sqrt(mnextValue + 10));

        await message.member.settings.update([["experience", mnextValue], ["level", mnextLevel]]);
        if (mcurrentLevel !== mnextLevel && message.guild.settings.levelUp) {
            await message.send(`Congratulations! ${message.author.tag}, You leveled up to level **${mcurrentLevel + 1}**!`);
        }
    }
};
