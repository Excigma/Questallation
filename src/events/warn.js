const { Event } = require("klasa");

module.exports = class extends Event {
	run(info) {
		if (this.client) {
			this.client.console.debug(info);
		}
	}
};
