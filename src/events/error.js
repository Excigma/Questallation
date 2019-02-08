const { Event } = require(`${process.cwd()}/src/index`);

module.exports = class extends Event {
    run(err) {
        if (this.client) {
            this.client.console.debug(err);
        }
    }
};
