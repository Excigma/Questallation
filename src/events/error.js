const { Event } = require("klasa");

module.exports = class extends Event {
	run(err) {
		if (this.client) {
			this.client.console.debug(err);
		}
	}
};
