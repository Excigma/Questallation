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
        if (!pointCooldown.get(message.author.id)) {
            pointCooldown.set(message.author.id, Date.now());
        } else {
            if (Date.now() - 60000 < pointCooldown.get(message.author.id)) return;
            pointCooldown.delete(message.author.id);
        }

        const nextValue = message.author.settings.experience + 10;
        const currentLevel = message.author.settings.level;
        const nextLevel = Math.floor(0.1 * Math.sqrt(nextValue + 10));

        await message.author.settings.update([["experience", nextValue], ["level", nextLevel]]);
        if (currentLevel !== nextLevel && message.guild.settings.levelUp) {
            await message.send(`Congratulations! ${message.author.tag}, You leveled up to level **${currentLevel + 1}**!`);
        }
    }
};
