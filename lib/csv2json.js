'use strict';

const csvParse = require('csv-parse');
const fs = require('fs');
const promisify = require('es6-promisify');
const path = require('path');
const { init, separateIntoLanguage, separateFilePathAndText } = require('./util');

const readFile = promisify(fs.readFile);
const parse = promisify(csvParse);
const writeFile = promisify(fs.writeFile);

function csv2json(csvFile, distDir) {
    const distFileName = `${path.basename(csvFile, '.csv')}.json`;

    init(distDir)
        .then(() => readFile(csvFile, 'utf8')) // CSVを読み込む
        .then((csv) => parse(csv, { columns: true, auto_parse: true })) // CSVをJSONにパースする
        .then((json) => separateIntoLanguage(json)) // 言語別に分ける
        .then((json) => // 言語ごとにファイルのパスとテキストの組に分ける
            separateFilePathAndText(distDir, distFileName, json)
        )
        .then((distMapList) => // 書き込み
            Promise.all(
                distMapList.map(({ filePath, text }) => writeFile(filePath, text, 'utf8'))
            )
        )
        .catch((err) => console.log(err));
}
module.exports = csv2json;
