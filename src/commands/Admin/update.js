const { Command, util } = require(`${process.cwd()}/src/index`);

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ["pull"],
            permissionLevel: 10,
            description: "This updates the bot from its git repo.",
            extendedHelp: "This command is designed to update the bot from it's own repository, then reboots the bot for the changes to take effect."
        });
    }

    async run(message) {
        message.channel.send(["Yay I'm updating to a newer version right now",
            "Update incoming!",
            "This update might fix bugs, or make more",
            "I hope this isn't testing in production",
            "I'm getting updated, I'll be back",
            "New update? I wonder what is getting changed",
            "I smell some new features or bugfixes",
            "Let's see if the bugfix broke more things that it fixes",
            "Adding a new feature? I betcha there is a bug",
            "Update! But I think you missed a )",
            "I'm getting upgraded Oo",
            "Oh finally, an update"
        ].random());

        const { stdout, stderr } = await util.exec(`git fetch git@github.com:Excigma/ExcigmaBot.git
git reset --hard FETCH_HEAD
git clean -df
`, { timeout: 30000 });

        var out = [];
        if (stdout) out.push(stdout);
        if (stderr) out.push(stderr);

        await message.channel.send(`\`\`\`${out.join("\n------\n")}\`\`\``);
        await this.client.commands.get("reboot").run(message);
        await util.exec("refresh").catch(err => ({ err }));
    }
};