const { Command } = require("klasa");
const fetch = require("node-fetch");

class AnimalCommand extends Command {
    constructor(...args) {
        super(...args);
        this.getPicture = async (url) => {
            const body = await fetch(url);
            if (!body.ok) {
                const secondBody = await fetch(link);
                if (!body.ok) { throw "<a:ExcigmaCross:534470159604383744> | There was no response from the server after 2 attempts."; }

                return secondBody;
            }
            return body;
        };
    }
}
module.exports = AnimalCommand;
