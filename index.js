'use strict';
const micro = require('micro');
const yazl = require('yazl');

module.exports = req => micro.json(req).then(data => {
	const zip = new yazl.ZipFile();

	for (const x of data) {
		const body = x.data.data || x.data;
		const buf = Buffer.isBuffer(body) ? body : Buffer.from(body);

		zip.addBuffer(buf, x.path, {
			compress: true,
			mode: x.mode,
			mtime: x.mtime && new Date(x.mtime)
		});
	}

	zip.end();

	return zip.outputStream;
});
