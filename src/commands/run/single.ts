import { Command, flags } from '@oclif/command'
import { Runner } from '../../services'

export default class Single extends Command {
    static description = 'Run a single project'

    static examples = [
        `$ poly run:single`,
    ]

    // static flags = {
    //   help: flags.help({ char: 'h' }),
    //   // flag with a value (-n, --name=VALUE)
    //   name: flags.string({ char: 'n', description: 'name to print' }),
    //   // flag with no value (-f, --force)
    //   force: flags.boolean({ char: 'f' }),
    // }

    // static args = [{ name: 'file' }]

    async run() {
        // const c = new Config();
        // c.useConfig().catch(e => log.error(e));

        const runner = new Runner();

        // const {args, flags} = this.parse(Hello)
        // this.log(`Does config exist? ${configFile} ${fs.existsSync(configFile)}`)

    }
}
