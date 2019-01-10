const { Argument } = require("klasa");

module.exports = class extends Argument {

	run(arg, possible, msg) {
		if (this.constructor.regex.role.test(arg)) {
			return msg.guild.roles.get(this.constructor.regex.role.exec(arg)[1]);
		} else if (msg.guild.roles.find(role => role.name === arg)) {
			return msg.guild.roles.find(role => role.name === arg);
		} else if (msg.guild.roles.filter(role => role.name && role.name.toLowerCase() === arg.toLowerCase())) {
			return msg.guild.roles.filter(role => role.name && role.name.toLowerCase() === arg.toLowerCase());
		} else {
			throw (msg.language || this.client.languages.default).get("RESOLVER_INVALID_ROLE", possible.name);
		}
	}

};
