const { Event } = require("klasa");

module.exports = class extends Event {

	run(msg) {
		if (this.client.ready) {
			this.client.monitors.run(msg);

			/*
			const home = 
			const to =
						if (msg.channel.id == to) {
							var embed = {
								color: 0x7289DA,
								author: {
									name: `${msg.author.tag} (${msg.member.displayName})`,
									icon_url: msg.author.avatarURL()
								}
							}
							if (msg.content) embed.description = msg.content
							if (msg.attachments.size > 0) {
								embed.image = {
									url: msg.attachments.first().url
								}
							}
							this.client.channels.get(home).send({ embed })
						} else if (msg.channel.id == home) {
							if (msg.content) this.client.channels.get(to).send(msg.content)
							if (msg.attachments.size > 0) this.client.channels.get(t0).send({ files: [msg.attachments.first().url] })
						}*/
		}
	}

};
