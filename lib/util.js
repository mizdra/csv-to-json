'use strict';

const fs = require('fs');
const promisify = require('es6-promisify');
const path = require('path');
const entries = require('object.entries');
const { languageNames, languageMap } = require('./language');

const mkdir = promisify(fs.mkdir);

function init(distDir) {
    return mkdir(distDir)
        .catch(() => {})
        .then(() => {
            const tasks = [];
            languageNames.forEach(lang => {
                tasks.push(mkdir(path.join(distDir, lang)).catch(() => {}));
            });
            return Promise.all(tasks);
        });
}
module.exports.init = init;

function separateIntoLanguage(json) {
    const result = {
        ja: [],
        kr: [],
        fr: [],
        de: [],
        es: [],
        it: [],
        en: []
    };

    json.forEach(entry => {
        const newEntry = {};
        let localLanguageName;

        // local_language_idを除いたentryをlocal_language_idごとに分けて格納する
        for (const [key, value] of entries(entry)) {
            if (key === 'local_language_id') {
                localLanguageName = languageMap[value];
            } else {
                newEntry[key] = value;
            }
        }
        result[localLanguageName].push(newEntry);
    });

    return result;
}
module.exports.separateIntoLanguage = separateIntoLanguage;

function separateFilePathAndText(distDir, fileName, json) {
    return entries(json).map(([lang, entryList]) => {
        const filePath = path.join(distDir, lang, fileName);
        const text = JSON.stringify(entryList, null, '  ');
        return { filePath, text };
    });
}
module.exports.separateFilePathAndText = separateFilePathAndText;