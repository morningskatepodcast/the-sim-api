const fs = require('fs');

const { send } = require('micro');
const compress = require('micro-compress');
const cors = require('micro-cors')();
const get = require('micro-get');
const parse = require('date-fns/parse');

const FILE_NAME = './latest.json';

const { mtime } = fs.statSync(FILE_NAME);
const data = JSON.parse(fs.readFileSync(FILE_NAME, 'utf8'));

const updatedAt = parse(mtime);

const handler = async (req, res) => send(res, 200, { updatedAt, data });

module.exports = get(compress(cors(handler)));
