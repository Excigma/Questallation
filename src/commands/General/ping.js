const { Command } = require(`${process.cwd()}/src/index`);

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Checks bot to discord connection speed."
        });
    }

    async run(message) {
        const msg = await message.sendMessage("<a:typing:434472906970628096> | 🏸 | Pinging in progress, please wait");
        message.sendMessage("🏸 | " + [
                "Huh what? Was I meant to say {{ping}}?",
                "{{ping}}?? Did i do it right?",
                "Hello, I'm here ping was {{ping}}",
                "Zzz {{ping}} what?",
                "Seems like the response time was {{ping}}",
                "You just wasted {{ping}} of my time",
                "Another {{ping}} of my time wasted",
                "Whaa-- {{ping}}?",
                "Oh wow, seems like ping was umm.. {{ping}}?",
                "{{ping}}?",
                "Hmm {{ping}} seems *ok*",
                "Ping pong, it took {{ping}}",
                "Oh hi, it took me {{ping}}",
                "It took me {{ping}}... Sorry I was taking a nap",
                "{{ping}}! If I'm offline, you can go to <https://excigmabot.glitch.me>, and I should be online.",
                "Eh? {{ping}}?",
                "{{ping}}, sorry I have bad Wifi",
                "{{ping}}, fun fact: I like blurple.",
                "{{ping}} is higher than my favourite number...",
                "{{ping}} is more than twice my favourite number",
                "{{ping}}!! Did you know my birthday was at 30th July 2017?",
                "Wow.. {{ping}}",
                "Hey {{ping}}, {{ping}}, {{ping}}. Got any grapes?",
                "Didn't you hear? {{ping}}?",
                "I thought I told you before... well here you go: {{ping}}",
                "What? I just told you. {{ping}}"
            ].random() //eslint-disable-next-line no-irregular-whitespace
            .replaceAll("{{ping}}", `​**${(msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)}ms**`));
    }

};