const { Argument } = require(`${process.cwd()}/src/index`);
const lev = require("js-levenshtein");

module.exports = class extends Argument {

    constructor(...args) {
        super(...args, { aliases: ["mention"] });
    }

    async run(arg, possible, msg) {

        const user = this.constructor.regex.userOrMember.test(arg) ? await this.client.users.fetch(this.constructor.regex.userOrMember.exec(arg)[1]).catch(() => null) : null;
        if (user) return user;

        const user1 = this.client.users.find(user => user.tag.toLowerCase() === arg.toLowerCase()) || this.client.users.find(user => user.username.toLowerCase() === arg.toLowerCase()) || this.client.users.resolve(arg);

        if (user1) return user1;
        console.log("a");
        var object = {};
        for (const person of this.client.users.values()) {
            object[lev(person.username, arg)] = person.id;
        }

        const final = this.client.users.get(object[Object.values(Object.keys(object).sort((a, b) => a - b))[0]]);
        console.log(final);
        if (final) return final;

        throw (msg.language || this.client.languages.default).get("RESOLVER_INVALID_USER", possible.name);
    }
};
