# csv-to-json
[metaunicorn/pokedex-data](https://github.com/metaunicorn/pokedex-data) で提供されるCSVを
[i18next/i18next](https://github.com/i18next/i18next) で利用できるようにJSONに変換します.

# Installation
```bash
$ npm install -g mizdra/csv-to-json
```


# Usage
```bash
# help
$ csv2json --help

  Usage: csv2json <csv-file> <dist-dir>

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

# Example
$ cd github.com/mizdra/csv-to-json

$ ls sample
LICENSE                 nature_names.csv

$ csv2json sample/nature_names.csv sample/dist

$ ls sample
LICENSE                 dist                    nature_names.csv

$ head -15 sample/dist/ja/nature_names.json
[
  {
    "id": 1,
    "nature_id": 1,
    "name": "がんばりや"
  },
  {
    "id": 8,
    "nature_id": 2,
    "name": "ずぶとい"
  },
  {
    "id": 15,
    "nature_id": 3,
    "name": "ひかえめ"
```
