const micro = require('micro');
const test = require('ava');
const listen = require('test-listen');
const request = require('request-promise');
const parse = require('date-fns/parse');
const isDate = require('date-fns/is_date');

const server = require('./');

test('Server', async t => {
  const service = micro(server);
  const url = await listen(service);
  const res = await request(url);

  const body = JSON.parse(res);
  const keys = Object.keys(body);

  t.is('object', typeof body);
  t.is(2, keys.length);
  t.true(keys.includes('data'));
  t.true(keys.includes('updatedAt'));

  t.true(Array.isArray(body.data));
  t.true(isDate(parse(body.updatedAt)));

  service.close();
});
