
const { Extendable } = require('klasa');

module.exports = class extends Extendable {

    constructor(...args) {
        super(...args, { appliesTo: ['Message'] });
    }

    async extend(content, error = '❌') {
        const message = await this.reply(`|\`${error}\`| ${content}`)
        return message.delete({ timeout: 10000 });
    }
};
