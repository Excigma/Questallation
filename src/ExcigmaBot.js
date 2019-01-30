console.log("...");
const Client = require(`${process.cwd()}/src/lib/structures/ExcigmaClient`);
const production = process.env.NODE_ENV === "production";
require(`${process.cwd()}/src/lib/dotenv`).config();

require(`${process.cwd()}/src/lib/structures/ExcigmaGuild`);
require(`${process.cwd()}/src/lib/structures/ExcigmaMessage`);

Client.use(require('klasa-member-gateway'));
Client.use(require("klasa-dashboard-hooks"));

new Client().login(production ? process.env.TOKEN : process.env.PTB);

String.prototype.toProperCase = () => this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
String.prototype.replaceAll = (search, replacement) => this.replace(RegExp(search, "gi"), replacement);
Array.prototype.random = () => this[Math.floor(Math.random() * this.length)];

process.on("SIGINT", () => {
    console.log("...");
    process.exit();
});

/*
Add to website
Harsh
Sudo
Red
*/
