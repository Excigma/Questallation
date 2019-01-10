const { Command } = require("klasa");
let LangMap = new Map();
const langs = require(`${process.cwd()}/src/modules/langmap.json`);
const translate = require("google-translate-api");
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "Translates text into another language",
			usage: "<To:str> <Text:str{1,200}> [...]",
			enabled: false,
			extendedHelp: ["es Hello", "en despacito", "jp This will become some japanese"],
			usageDelim: " ",
			cooldown: 20
		});
	}

	async run(message, [to, ...text]) {
		const test = await translate(text.join(" "));
		var start = LangMap.get(test.from.language.iso);

		if (LangMap.get(to)) to = LangMap.get(to);


		const result = await translate(text.join(" "), {
			to: to.name,
			from: start.name
		});

		message.sendEmbed({
			title: "Translate",
			color: 0x7289DA,
			author: {
				name: message.author.tag,
				icon_url: message.author.avatarURL()
			},
			description: `\`💬\` ${message.author.tag} |  ${langs[start.name].alias[1].toProperCase()} (${start.flag}) \\➡ ${langs[to.name].alias[1].toProperCase()} (${to.flag})

**Starting text:**
${text.join(" ")}
**Result:**
${await result.text}`
		});
	}
	init() {
		for (let l in langs) {
			for (let a in langs[l].alias) {
				LangMap.set(langs[l].alias[a], { name: l, flag: `:flag_${langs[l].flag}:` });
			}
		}
	}
};