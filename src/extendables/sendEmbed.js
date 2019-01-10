const { Extendable, KlasaMessage } = require("klasa");


module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, {
			appliesTo: [KlasaMessage]
		});
	}

	sendEmbed(embed, content, options = {}) {
		if (typeof content === "object") {
			options = content;
			content = "";
		}

		const object = {
			author: {
				name: this.author.tag,
				url: this.author.displayAvatarURL(),
				iconURL: this.author.displayAvatarURL()
			},
			color: 0x7289DA,
			footer: {
				text: this.client.user.tag,
				iconURL: this.client.user.displayAvatarURL()
			},
			timestamp: Date.now()
		};

		for (var attrname in object) {
			if (!embed[attrname] || embed[attrname] === undefined || embed[attrname] === null) {
				embed[attrname] = object[attrname];
			}
		}
		return this.send({ content, ...options, embed });
	}
};
