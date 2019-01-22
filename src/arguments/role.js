const { Argument } = require(`${process.cwd()}/src/index`);
const lev = require("js-levenshtein")
module.exports = class extends Argument {

    run(arg, possible, msg) {
        if (this.constructor.regex.role.test(arg)) {
            return msg.guild.roles.get(this.constructor.regex.role.exec(arg)[1]);
        } else if (msg.guild.roles.find(role => role.name.toLowerCase() === arg.toLowerCase())) {
            return msg.guild.roles.find(role => role.name.toLowerCase() === arg.toLowerCase());
        } else if (msg.guild.roles.find(role => role.name.includes(arg.toLowerCase()))) {
            return msg.guild.roles.find(role => role.name.includes(arg.toLowerCase()))
        }
        var object = {}
        for (const role of msg.guild.roles.values()) {
            object[lev(role.name, arg)] = role.id
        }

        const final = msg.guild.roles.get(object[Object.values(Object.keys(object).sort((a, b) => a - b))[0]])
        if (final) return final;
        throw (msg.language || this.client.languages.default).get("RESOLVER_INVALID_ROLE", possible.name);
    }
};