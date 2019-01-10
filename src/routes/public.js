const { Route } = require("klasa-dashboard-hooks");
const fs = require("fs");
module.exports = class extends Route {
	constructor(...args) {
		super(...args, { route: "assets/:folder/:name" });
	}

	get(request, response) {
		const { folder, name } = request.params;
		if (!fs.existsSync(`${process.cwd()}/src/assets/${folder}`)) return response.end(`Cannot get ${folder}`);
		if (!fs.existsSync(`${process.cwd()}/src/assets/${folder}/${name}`)) return response.end(`Cannot get ${folder}/${name}`);
		return response.end(fs.readFileSync(`${process.cwd()}/src/assets/${folder}/${name}`));
	}
};
