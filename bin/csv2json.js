#!/usr/bin/env node
'use strict';

const program = require('commander');
const csv2json = require('../lib/csv2json');

// コマンドの設定
program
    .version('0.0.1')
    .usage('<csv-file> <dist-dir>')
    .parse(process.argv);

const [csvFile, distDir] = program.args;

// コマンド実行
csv2json(csvFile, distDir);
