const { Route } = require("klasa-dashboard-hooks");

module.exports = class extends Route {

	constructor(...args) {
		super(...args, { route: "invite" });
	}

	get(request, response) {
		response.writeHead(308, { Location: this.client.invite });
		response.end();
	}

};
