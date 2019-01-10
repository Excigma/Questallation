
const { Command/*, util*/ } = require("klasa");
/*
const { get, post } = require("snekfetch");
const inUse = new Map();
*/

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: "US President Trump makes something illegal.",
			usage: "<Text:str>",
			extendedHelp: "Powered by IsNowIllegal.com, get US President Trump to make anything illegal."
		});
	}
	//eslint-disable-next-line no-unused-vars
	async run(message, [str]) {
		message.send("The API is down, as the owner cannot maintain server costs");
		/*if (inUse.get("true")) return message.sendMessage("<:excigmabot_failure:490319592477032448> | Trump is currently making something else illegal, please wait for a while.");
		inUse.set("true", { user: message.author.id });
		if (str.length > 10) {
			inUse.delete("true");
			message.sendMessage("<:excigmabot_failure:490319592477032448> | Cannot be longer than 10 characters.");
			return;
		}
		try {
			message.send(`<a:typing:434472906970628096> | **Donald Trump** is making ${str} illegal...`);
			await post("https://is-now-illegal.firebaseio.com/queue/tasks.json").send({ task: "gif", word: str.toUpperCase() });
			await message.send(`<a:typing:434472906970628096> | **Donald Trump** showing that ${str} should be illegal...`);
			await util.sleep(5000);
			const result = await get(`https://is-now-illegal.firebaseio.com/gifs/${str.toUpperCase()}.json`);
            
			await message.sendEmbed({
				color: 0x7289DA,
				author: {
					name: message.author.tag,
					icon_url: message.author.avatarURL()
				},
				image: {
					url: result.body.url
				}
			});
			inUse.delete("true");
		} catch (error) {
			inUse.delete("true");
			throw error;
        }
        */
	}

};
