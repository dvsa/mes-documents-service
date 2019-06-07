const moment = require('moment');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const mocks = (nock, hostname) =>
  nock(hostname)
    .persist()
    .get('/')
    .delay(getRandomInt(0, 5) * 1000)
    .reply(200, () => `hello from nock - ${moment().format()}`);
module.exports = mocks;
