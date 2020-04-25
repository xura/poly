import "reflect-metadata"

import { Command } from '@oclif/command'
import { SourceControl, Logger as log } from '../../services'

export default class Push extends Command {
  static description = 'For each project, push all commits to the currently checked out branch'

  static examples = [
    `$ poly push:all`,
  ]

  run = () => new SourceControl().pushAll().catch(e => log.error(e));
}
