import "reflect-metadata"

import { Command } from '@oclif/command'
import { Runner, Logger as log } from '../../services'

export default class All extends Command {
  static description = 'Run all projects'

  static examples = [
    `$ poly run:all`,
  ]

  run = () => new Runner().runAll().catch(e => log.error(e));
}
