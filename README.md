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
poly/0.0.0 darwin-x64 node-v12.16.1
$ poly --help [COMMAND]
USAGE
  $ poly COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`poly hello [FILE]`](#poly-hello-file)
* [`poly help [COMMAND]`](#poly-help-command)

## `poly hello [FILE]`

describe the command here

```
USAGE
  $ poly hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ poly hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/xura/poly/blob/v0.0.0/src/commands/hello.ts)_

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
<!-- commandsstop -->
