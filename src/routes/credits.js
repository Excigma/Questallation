const { Route } = require("klasa-dashboard-hooks");
const { renderFile } = require("ejs");
const credits = require(`${process.cwd()}/src/lib/credits`);

module.exports = class extends Route {

	constructor(...args) {
		super(...args, { route: "credits" });
	}

	async get(request, response) {
		const toSend = {};

		for (const person of Object.keys(credits)) {
			const user = await this.client.users.fetch(person);
			toSend[person] = {
				credits: credits[person],
				tag: user.tag,
				avatar: user.displayAvatarURL()
			};
		}
		console.log(toSend);

		response.setHeader("content-type", "text/html");
		return renderFile(`${process.cwd()}/src/pages/credits.ejs`, { path: request.path, credits: toSend }, { root: `${process.cwd()}/src/routes` }, (err, str) => {
			if (err) {
				throw err;
			}
			response.end(str);
		});
	}

};
