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
* [`poly push:all`](#poly-pushall)
* [`poly run:all`](#poly-runall)

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

## `poly push:all`

For each project, push all commits to the currently checked out branch

```
USAGE
  $ poly push:all

EXAMPLE
  $ poly push:all
```

_See code: [src/commands/push/all.ts](https://github.com/xura/poly/blob/v0.0.4/src/commands/push/all.ts)_

## `poly run:all`

Run all projects

```
USAGE
  $ poly run:all

OPTIONS
  -r, --runner=runner

EXAMPLE
  $ poly run:all
```

_See code: [src/commands/run/all.ts](https://github.com/xura/poly/blob/v0.0.4/src/commands/run/all.ts)_
<!-- commandsstop -->
