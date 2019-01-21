const { config: mathConfig } = require("mathjs"), { Event, version: klasaVersion, Duration } = require("klasa");

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            enabled: true,
            once: true
        });
    }

    async run() {
        this.client.console.debug("KlasaClient: Ready");
        String.prototype.toProperCase = function() {
            return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => {
                return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
            });
        };
        String.prototype.replaceAll = function(search, replacement) { return this.replace(RegExp(search, "gi"), replacement); };
        Array.prototype.random = function() { return this[Math.floor(Math.random() * this.length)]; };
        mathConfig({ number: "BigNumber" });
        process
            .on("uncaughtException", error => this.client.console.debug(`uncaughtException:\n${error.stack}`))
            .on("error", error => this.client.console.debug(`Error:\n${error.stack}`))
            .on("warn", error => this.client.console.debug(`Warning:\n${error.stack}`));

        console.log(` ______          _                       ____        _    | Guilds: ${this.client.guilds.size}`);
        console.log(`|  ____|        (_)                     |  _ \\      | |   | Users:  ${this.client.users.size}`);
        console.log(`| |__  __  _____ _  __ _ _ __ ___   __ _| |_) | ___ | |_  | Ping:   ${Math.round(this.client.ws.ping)}`);
        console.log(`|  __| \\ \\/ / __| |/ _\` | '_ \` _ \\ / _\` |  _ < / _ \\| __| | D.js:   v${require("discord.js").version}`);
        console.log(`| |____ >  | (__| | (_| | | | | | | (_| | |_) | (_) | |_  | Klasa:  v${klasaVersion}`);
        console.log(`|______/_/\\_\\___|_|\\__, |_| |_| |_|\\__,_|____/ \\___/ \\__| | OS Up:  ${Duration.toNow(Date.now() - (require("os").uptime() * 1000))}`);
        console.log(`                    __/ |                                 | Node:   ${process.version}`);
        console.log(`                   |____/                                 | Env:    ${process.env.NODE_ENV === "production" ? "Production" : "Development"}\n`);
    }
};