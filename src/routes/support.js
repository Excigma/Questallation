const { Route } = require("klasa-dashboard-hooks");

module.exports = class extends Route {

	constructor(...args) {
		super(...args, { route: "support" });
	}


	get(request, response) {
		response.writeHead(308, { Location: "https://discord.gg/VW9AKXh" });
		response.end();
	}

};
