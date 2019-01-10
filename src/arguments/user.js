const { Argument } = require("klasa");

module.exports = class extends Argument {

	constructor(...args) {
		super(...args, { aliases: ["mention"] });
	}

	async run(arg, possible, msg) {
		if (await this.client.users.find(user => user.tag && user.tag === arg)) {
			return this.client.users.find(user => user.tag && user.tag === arg);
		} else if (await this.client.users.find(user => user.username && user.username === arg)) {
			return this.client.users.find(user => user.username && user.username === arg);
		} else if (await this.client.users.resolve(arg)) {
			return this.client.users.resolve(arg);
		} else if (this.client.user.bot && this.constructor.regex.userOrMember.test(arg)) {
			return await this.client.users.fetch(this.constructor.regex.userOrMember.exec(arg)[1]).catch(() => null);
		}
		throw (msg.language || this.client.languages.default).get("RESOLVER_INVALID_USER", possible.name);

	}
};
