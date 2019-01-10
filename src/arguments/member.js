const { Argument } = require("klasa");

module.exports = class extends Argument {

	async run(arg, possible, msg) {
		if (msg.guild.members.find(member => member.displayName && member.displayName === arg)) {
			return msg.guild.members.find(member => member.displayName && member.displayName === arg);
		} else if (await msg.guild.members.resolve(await this.client.users.find(user => user.tag && user.tag === arg))) {
			return await msg.guild.members.resolve(await this.client.users.find(user => user.tag && user.tag === arg));
		} else if (await msg.guild.members.resolve(await this.client.users.find(user => user.username && user.username === arg))) {
			return await msg.guild.members.resolve(await this.client.users.find(user => user.username && user.username === arg));
		} else if (msg.guild.members.resolve(arg)) {
			return msg.guild.members.resolve(arg);
		} else if (this.client.user.bot && this.constructor.regex.userOrMember.test(arg)) {
			const user = await this.client.users.fetch(this.constructor.regex.userOrMember.exec(arg)[1]).catch(() => null);
			if (user) {
				if (msg.guild.members.fetch(user).catch(() => null)) return msg.guild.members.fetch(user).catch(() => null);
			} else {
				throw (msg.language || this.client.languages.default).get("RESOLVER_INVALID_MEMBER", possible.name);
			}
		}
		throw (msg.language || this.client.languages.default).get("RESOLVER_INVALID_MEMBER", possible.name);

	}

};
