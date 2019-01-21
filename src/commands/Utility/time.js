const { Command } = require("klasa");
const fetch = require("node-fetch")
const HTMLParser = require("fast-html-parser");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["data"],
            description: "Shows the current time for a timezone",
            extendedHelp: ["Auckland"],
            usage: "[Timezone:str]"
        });
    }

    async run(message, [timezone = "Auckland"]) {
        timezone = timezone.toLowerCase()
        const world_dir = await this.getTime(`https://24timezones.com/world_directory/time_in_${timezone.split(" ").join("_")}.php`)
        if (world_dir) return this.sendTime(message, timezone, world_dir)
        const us = await this.getTime(`https://24timezones.com/usa/time_in_${timezone.split(" ").join("_")}`)
        if (us) return this.sendTime(message, timezone, us)


        return message.send(`<a:ExcigmaCross:534470159604383744> | That is not a recognised timezone. Please contact Excigma#0001 to maybe add your city`)
    }
    async getTime(url) {
        const root = await fetch(url)
            .then(result => result.text())
            .then(HTMLParser.parse);
        const time = root.querySelector("#currentTime");
        if (!time || !time.text) return false
        return time
    }
    sendTime(message, timezone, time) {
        message.send(`The date and time in ${timezone.toProperCase()} is ${time.text}`)

    }

};