const { Route } = require("klasa-dashboard-hooks");
const { renderFile } = require("ejs");
module.exports = class extends Route {

	constructor(...args) {
		super(...args, { route: "commands" });
	}

	async get(request, response) {
		var commands = {};
		for (const cmd of this.client.commands.values()) {
			if (!commands.hasOwnProperty(cmd.category)) commands[cmd.category] = {};
			commands[cmd.category][cmd.name] = {
				name: cmd.name,
				description: cmd.description,
				usage: cmd.usageString
			};
		}

		response.setHeader("content-type", "text/html");
		return renderFile(`${process.cwd()}/src/pages/commands.ejs`, { path: request.path, cmds: commands }, { root: `${process.cwd()}/src/routes` }, (err, str) => {
			if (err) {
				throw err;
			}
			response.end(str);
		});
	}

};
