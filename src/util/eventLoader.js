const { glob } = require('glob')
const { promisify } = require('util');

const globPromise = promisify(glob);

module.exports = async (client) => {

    const eventfiles = await globPromise(`${__dirname}/../events/*.js`);
    eventfiles.map((value) => require(value));
    console.log(`Loaded ${eventfiles.length} events`);
}

