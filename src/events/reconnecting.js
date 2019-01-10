const { Event } = require("klasa");

module.exports = class extends Event {
	run() {
		if (this.client) {
			this.client.console.debug("Bot reconnecting...");
		}
	}
};
