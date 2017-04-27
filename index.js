'use strict';
const getStream = require('get-stream');
const isStream = require('is-stream');
const micro = require('micro');
const yazl = require('yazl');

module.exports = micro(async req => {
	const data = await micro.json(req);
	const zip = new yazl.ZipFile();

	for (const x of data) {
		const body = x.data.data || data;
		const buf = isStream(body) ? await getStream.buffer(body) : Buffer.isBuffer(body) ? body : Buffer.from(body);

		zip.addBuffer(buf, x.path, {
			compress: true,
			mode: x.mode,
			mtime: x.mtime && new Date(x.mtime)
		});
	}

	zip.end();

	return zip.outputStream;
});
