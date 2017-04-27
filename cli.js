#!/usr/bin/env node
'use strict';
const meow = require('meow');
const m = require('./');

const cli = meow(`
	Usage
	  $ zipy

	Options
	  --port  Port to listen on
`);

m.listen(cli.flags.port || process.env.PORT || 3000);
