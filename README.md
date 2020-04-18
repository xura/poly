poly
====



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/poly.svg)](https://npmjs.org/package/poly)
[![Downloads/week](https://img.shields.io/npm/dw/poly.svg)](https://npmjs.org/package/poly)
[![License](https://img.shields.io/npm/l/poly.svg)](https:s//github.com/xura/poly/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g poly
$ poly COMMAND
running command...
$ poly (-v|--version|version)
poly/0.0.4 darwin-x64 node-v12.16.1
$ poly --help [COMMAND]
USAGE
  $ poly COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`poly help [COMMAND]`](#poly-help-command)
* [`poly run:all`](#poly-runall)
* [`poly run:single`](#poly-runsingle)

## `poly help [COMMAND]`

display help for poly

```
USAGE
  $ poly help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `poly run:all`

Run all projects

```
USAGE
  $ poly run:all

EXAMPLE
  $ poly run:all
```

_See code: [src/commands/run/all.ts](https://github.com/xura/poly/blob/v0.0.4/src/commands/run/all.ts)_

## `poly run:single`

Run a single project

```
USAGE
  $ poly run:single

EXAMPLE
  $ poly run:single
```

_See code: [src/commands/run/single.ts](https://github.com/xura/poly/blob/v0.0.4/src/commands/run/single.ts)_
<!-- commandsstop -->
