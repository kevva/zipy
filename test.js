import fs from 'fs';
import decompressUnzip from 'decompress-unzip';
import got from 'got';
import isZip from 'is-zip';
import pify from 'pify';
import test from 'ava';
import testListen from 'test-listen';
import m from './';

let url;
let fixture;

const getZip = async (url, files) => (await got.post(url, {
	encoding: null,
	headers: {'content-type': 'application/json'},
	body: JSON.stringify(files)
})).body;

test.before(async () => {
	url = await testListen(m);
	fixture = await pify(fs.readFile)(__filename);
});

test('single file', async t => {
	const body = await getZip(url, [{
		data: fixture,
		path: 'foo.js'
	}]);

	t.true(isZip(body));
	t.is((await decompressUnzip()(body))[0].path, 'foo.js');
});

test('nested file', async t => {
	const body = await getZip(url, [{
		data: fixture,
		path: 'unicorn/foo.js'
	}]);

	const files = await decompressUnzip()(body);

	t.true(isZip(body));
	t.is(files[0].path, 'unicorn/foo.js');
});

test('mode', async t => {
	const body = await getZip(url, [{
		data: fixture,
		mode: 33261,
		path: 'foo.js'
	}]);

	const files = await decompressUnzip()(body);

	t.true(isZip(body));
	t.is(files[0].mode, 33261);
});

test('mtime', async t => {
	const date = new Date('2000-01-01');
	const body = await getZip(url, [{
		data: fixture,
		mtime: date,
		path: 'foo.js'
	}]);

	const files = await decompressUnzip()(body);

	t.true(isZip(body));
	t.is(files[0].mtime.toISOString(), date.toISOString());
});

test('streaming body', async t => {
	const body = await getZip(url, [{
		data: fs.createReadStream(__filename),
		path: 'foo.js'
	}]);

	t.true(isZip(body));
	t.is((await decompressUnzip()(body))[0].path, 'foo.js');
});
