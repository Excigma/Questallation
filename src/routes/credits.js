const { Route } = require("klasa-dashboard-hooks");
const { renderFile } = require("ejs");
module.exports = class extends Route {

	constructor(...args) {
		super(...args, { route: "credits" });
	}

	async get(request, response) {
		response.setHeader("content-type", "text/html");
		return renderFile(`${process.cwd()}/src/routes/credits.ejs`, { path: request.path }, { root: `${process.cwd()}/src/routes` }, (err, str) => {
			if (err) {
				throw err;
			}
			response.end(str);
		});
	}

};
