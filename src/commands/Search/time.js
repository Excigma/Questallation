const { Command } = require(`${process.cwd()}/src/index`);
const fetch = require("node-fetch");
const HTMLParser = require("fast-html-parser");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["data"],
            description: "Shows the current time for a timezone",
            extendedHelp: ["Auckland"],
            usage: "[Timezone:str{0,}]"
        });
    } // https://24timezones.com/suggest?term=new+zealand&lang=en

    async run(message, [timezone = "Auckland"]) {
        const place = await this.getPlace(timezone);
        console.log(place);
        if (!place) return message.send(`<a:ExcigmaCross:534470159604383744> | That is not a recognised timezone. `);
        const result = await this.getTime(`https://24timezones.com${place.id}`);
        return message.send(`The date and time in ${place.text.toProperCase()} is ${result.text}`);

    }
    async getTime(url) {
        const root = await fetch(url)
            .then(result => result.text())
            .then(HTMLParser.parse);
        const time = root.querySelector("#currentTime");
        if (!time || !time.text) return false;
        return time;
    }
    async getPlace(place) {
        const data = await fetch(`https://24timezones.com/suggest?term=${encodeURIComponent(place)}&lang=en`)
            .then(result => result.json());
        console.log(data);
        if (data.total_found > 0) return data.items[0];
        return false;
    }


};
