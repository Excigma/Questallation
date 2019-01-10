/* eslint-disable callback-return*/
const { resolve } = require("path"),
	express = require("express"),
	{ renderFile } = require("ejs"),
	compression = require("compression"),
	mcache = require("memory-cache"),
	{ version: klasaVersion, Duration } = require("klasa");

module.exports = async (client) => {
	client.console.debug("Website: Initiating");
	var commands = {};

	for (const cmd of client.commands.values()) {
		if (!commands.hasOwnProperty(cmd.category)) commands[cmd.category] = {};
		commands[cmd.category][cmd.name] = {
			name: cmd.name,
			description: cmd.description,
			usage: cmd.usageString
		};
	}

	var cache = () => {
		return (req, res, next) => {
			if (process.env.NODE_ENV === "production") {
				const key = `__express__${req.originalUrl}` || req.url;
				const cachedBody = mcache.get(key);
				if (cachedBody) {
					res.send(cachedBody);
					return;
				} else {
					res.sendResponse = res.send;
					res.send = (body) => {
						mcache.put(key, body);
						res.sendResponse(body);
					};
					next();
				}
			} else {
				next();
			}
		};
	};


	await express()
		.use(compression({ threshold: 1 }))
		.enable("etag")
		.use((req, res, next) => {
			res.set();
			next();
		})
		.use("/", express.static(resolve("./src/public")));
	/*
	.engine("html", renderFile)
	.set("view engine", "html")
	.get("/", cache(), (req, res) => res.render(resolve("./src/pages/index.ejs"), { path: req.path }))
	.get("/index", cache(), (req, res) => res.render(resolve("./src/pages/index.ejs")))
	.get("/commands", cache(), (req, res) => res.render(resolve("./src/pages/commands.ejs"), { cmds: commands, path: req.path }))
	.get("/credits", cache(), (req, res) => res.render(resolve("./src/pages/credits.ejs"), { path: req.path }))
	.get("/support", cache(), (req, res) => res.redirect("https://discord.gg/P8zDm6y"))
	.get("/invite", cache(), (req, res) => res.redirect("https://discordapp.com/oauth2/authorize?client_id=341124681211969539&permissions=3238944&scope=bot"))
	/* eslint-disable-next-line no-unused-vars * /
	.use((err, req, res, next) => { res.status(500); res.render(resolve("./src/pages/500.ejs"), { path: "/500 - Internal server error" }); console.error(err); })
	.use((req, res) => { res.status(404); res.render(resolve("./src/pages/404.ejs"), { path: "/404 - Page not found" }); })
		.listen(process.env.PORT || "8080", () => client.console.debug(`Website: Ready on port ${process.env.PORT || "8080"}`));*/


};
