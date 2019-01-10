console.log("...");
const { Client, PermissionLevels } = require("klasa");
const production = process.env.NODE_ENV === "production";
require("dotenv").config();
require(`${process.cwd()}/src/lib/ExcigmaGuild`);

Client.use(require("klasa-dashboard-hooks"));

new Client({
	production: production,
	disabledEvents: [
		"GUILD_MEMBER_ADD",
		"GUILD_MEMBER_REMOVE",
		"GUILD_INTEGRATIONS_UPDATE",
		"GUILD_BAN_ADD",
		"GUILD_BAN_REMOVE",
		"CHANNEL_PINS_UPDATE",
		"MESSAGE_DELETE_BULK",
		"USER_NOTE_UPDATE",
		"USER_SETTINGS_UPDATE",
		"TYPING_START",
		"WEBHOOKS_UPDATE"
	],
	disabledCorePieces: ["commands"],
	prefix: production ? "eb" : "ed",
	regexPrefix: production ? /^(?:(?:hey|oi|yo) )?e(?:xcigma(?:bot)?|b)[,!]? ?/i : /^(?:(?:hey|oi|yo) )?e(?:xcigma(?:dev)?|d)[,!]? ?/i,
	noPrefixDM: true,
	disableEveryone: true,
	ownerID: "321137772054183947",
	commandEditing: true,
	commandLogging: true,
	dashboardHooks: {
		apiPrefix: "/",
		port: process.env.PORT
	},
	console: production ? { useColor: false, utc: true } : { useColor: true, utc: true },
	presence: production ? { activity: { name: "for ebhelp", type: "WATCHING" } } : { activity: { name: "for edhelp", type: "WATCHING" } },
	pieceDefaults: {
		commands: {
			cooldown: 2,
			deletable: true
		}
	},
	readyMessage: (client) => `${client.user.tag} ( ${production ? "Production" : "Development"} ), Ready to serve ${client.guilds.size} guilds and ${client.users.size} users`,
	permissionLevels: new PermissionLevels()
		.add(0, () => true)
		.add(4, (client, msg) => msg.member && msg.member.permissions.has("MANGE_MESSAGES"), { fetch: true })
		.add(5, (client, msg) => msg.member && msg.member.permissions.has("KICK_MEMBERS"), { fetch: true })
		.add(6, (client, msg) => msg.member && msg.member.permissions.has("MANGE_SERVER"), { fetch: true })
		.add(7, (client, msg) => msg.member && msg.member.permissions.has("BAN_MEMBERS"), { fetch: true })
		.add(10, (client, msg) => msg.member.id === "321137772054183947", { fetch: true })
}).login(production ? process.env.TOKEN : process.env.PTB);

process.on("SIGINT", () => {
	console.log("...");
	process.exit();
});
