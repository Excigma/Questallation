const { Command, util } = require('klasa');
const snekfetch = require('snekfetch')

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
            description: 'Random jokes that aren\'t funny at all.',
            extendedHelp: 'This command gets a random dad joke from icanhazdadjoke.com.'
		});
	}

	async run(message) {
       await message.sendMessage('<a:typing:434472906970628096> | Getting a not funny joke.')
        const {
            body
        } = await snekfetch
            .get('https://icanhazdadjoke.com/')
            .set({
                Accept: 'application/json'
            })
        await util.sleep(2000)
        message.sendMessage(`${body.joke}`)
	}

};
