const { Inhibitor, util } = require("klasa");
const { Permissions, Permissions: { FLAGS } } = require("discord.js");

module.exports = class extends Inhibitor {
	constructor(...args) {
		super(...args);
		this.impliedPermissions = new Permissions(522304).freeze();
		this.friendlyPerms = Object.keys(FLAGS).reduce((obj, key) => {
			obj[key] = util.toTitleCase(key.split("_").join(" "));
			return obj;
		}, {});
	}

	async run(message, command) {
		console.log(command.userPermissions);
		const missing = message.channel.type === "text" ?
			message.channel.permissionsFor(message.author).missing(command.userPermissions, false) :
			this.impliedPermissions.missing(command.userPermissions, false);
		if (missing.length) throw message.language.get("INHIBITOR_MISSING_USER_PERMS", missing.map(key => this.friendlyPerms[key]).join(", "));
	}

};
