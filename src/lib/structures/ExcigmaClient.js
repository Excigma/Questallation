const { Client, PermissionLevels, Schema } = require("klasa");
const production = process.env.NODE_ENV === "production";

module.exports = class extends Client {
    constructor(options = {
        gateways: {
            guilds: {
                schema: Client.defaultGuildSchema
                    .add("levelUp", "boolean", { default: false })
            },
            users: {
                schema: new Schema()
                    .add("experience", "Integer", {
                        default: 0,
                        configurable: false
                    })
                    .add("level", "Integer", {
                        default: 0,
                        configurable: false
                    })
            }
        },
        schedule: {
            interval: 5000
        },
        prefixCaseInsensitive: true,
        createPiecesFolders: false,
        typing: true,
        retryLimit: 5,
        production: production,
        disabledEvents: ["CHANNEL_PINS_UPDATE", "GUILD_BAN_ADD", "GUILD_BAN_REMOVE", "RELATIONSHIP_ADD", "RELATIONSHIP_REMOVE", "TYPING_START"],
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
                promptLimit: 1,
                cooldown: 2,
                deletable: true
            }
        },
        consoleEvents: {
            debug: true,
            error: true,
            log: true,
            verbose: true,
            warn: true,
            wtf: true
        },
        readyMessage: (client) => `${client.user.tag} ( ${production ? "Production" : "Development"} ), Ready to serve ${client.guilds.size} guilds and ${client.users.size} users`,
        permissionLevels: new PermissionLevels()
            .add(0, () => true)
            .add(4, (msg) => msg.member && msg.member.permissions.has("MANGE_MESSAGES"), { fetch: true })
            .add(5, (msg) => msg.member && msg.member.permissions.has("KICK_MEMBERS"), { fetch: true })
            .add(6, (msg) => msg.member && msg.member.permissions.has("MANGE_SERVER"), { fetch: true })
            .add(7, (msg) => msg.member && msg.member.permissions.has("BAN_MEMBERS"), { fetch: true })
            .add(10, (msg) => msg.member.id === "321137772054183947", { fetch: true })
    }) {
        super(options);
        this.tick = "<a:ExcigmaTick:534470159465971722> |";
        this.cross = "<a:ExcigmaCross:534470159604383744> |";
        this.production = production;
    }
};
