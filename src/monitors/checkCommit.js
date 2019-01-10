const { Monitor } = require("klasa");

module.exports = class extends Monitor {
	constructor(...args) {
		super(...args, {
			ignoreOthers: false,
			ignoreBots: false,
			ignoreWebhooks: false
		});
	}

	async run(message) {
		// eslint-disable-next-line max-len
		return message.channel.id === "533028117795569664" && process.env.NODE_ENV === "production" ? this.client.commands.get("pull").run(message) : undefined;
	}
};
