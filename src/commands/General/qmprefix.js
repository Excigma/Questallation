const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            permissionLevel: 6,
            guarded: true,
            subcommands: true,
            aliases: ["eprefix"],
            description: "Changes the prefix of the bot",
            usage: "<set|reset> (Prefix:prefix{0,20})",
            usageDelim: " "
        });
        this
            .createCustomResolver("prefix", (arg, possible, message, [action]) => {
                if (action === "reset" || arg) return arg;
                throw message.language.get("COMMAND_CONF_NOVALUE");
            });
    }


    async set(message, [...valueToSet]) {
        const status = await message.guild.settings.update("prefix", valueToSet.join(" "), message.guild, { avoidUnconfigurable: true, action: "add" });
        message.guild.settings.update("disableNaturalPrefix", "true", message.guild, { avoidUnconfigurable: true, action: "add" });
        return this.check(message, "prefix", status) || message.sendLocale("COMMAND_CONF_UPDATED", ["prefix", message.guild.settings.resolveString(message, status.updated[0].piece)]);
    }


    async reset(message) {
        const status = await message.guild.settings.reset("prefix", message.guild, true);
        message.guild.settings.update("disableNaturalPrefix", "false", message.guild, { avoidUnconfigurable: true, action: "add" });
        return this.check(message, "prefix", status) || message.sendLocale("COMMAND_CONF_RESET", ["prefix", message.guild.settings.resolveString(message, status.updated[0].piece)]);
    }

    check(message, key, { errors, updated }) {
        if (errors.length) return message.sendMessage(String(errors[0]));
        if (!updated.length) return message.sendLocale("COMMAND_CONF_NOCHANGE", [key]);
        return null;
    }

};
