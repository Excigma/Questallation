const { Argument } = require("klasa");
const lev = require("js-levenshtein")

module.exports = class extends Argument {

    async run(arg, possible, msg) {
        if (msg.guild.members.find(member => member.displayName.toLowerCase() === arg.toLowerCase())) {
            return msg.guild.members.find(member => member.displayName.toLowerCase() === arg.toLowerCase());
        } else if (await msg.guild.members.resolve(await this.client.users.find(user => user.tag.toLowerCase() === arg.toLowerCase()))) {
            return await msg.guild.members.resolve(await this.client.users.find(user => user.tag.toLowerCase() === arg.toLowerCase()));
        } else if (await msg.guild.members.resolve(await this.client.users.find(user => user.username.toLowerCase() === arg.toLowerCase()))) {
            return await msg.guild.members.resolve(await this.client.users.find(user => user.username.toLowerCase() === arg.toLowerCase()));
        } else if (msg.guild.members.resolve(arg)) {
            return msg.guild.members.resolve(arg);
        } else if (this.constructor.regex.userOrMember.test(arg)) {
            const user = await this.client.users.fetch(this.constructor.regex.userOrMember.exec(arg)[1]).catch(() => null);
            if (user) {
                if (msg.guild.members.fetch(user).catch(() => null)) return msg.guild.members.fetch(user).catch(() => null);
            }
        }
        var object = {}
        for (const member of msg.guild.members.values()) {
            object[lev(member.user.tag, arg)] = member.id
        }

        const final = msg.guild.member.get(object[Object.values(Object.keys(object).sort((a, b) => a - b))[0]])
        if (final) return final;
        throw (msg.language || this.client.languages.default).get("RESOLVER_INVALID_MEMBER", possible.name);

    }

};