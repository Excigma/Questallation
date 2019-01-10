const { Extendable, Command } = require("klasa");


module.exports = class extends Extendable {
	constructor(...args) {
		super(...args, {
			appliesTo: [Command]
		});
		this.userPermissions = [];
	}
};
