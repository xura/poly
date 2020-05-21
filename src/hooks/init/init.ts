import { container } from 'tsyringe'
import { Hook } from '@oclif/config'

import { Webpack, ObservableProcess, Spinnies, Git } from '../../adapters'
import { Config } from '../../core/config'
import { Runner } from '../../core/config/definitions'
import { IRunner } from '../../interfaces';

export const inject = (args: string[]) => {
    container.registerSingleton('IConfig', Config);
    container.registerSingleton('ITerminalList', Spinnies);
    container.register('IProcess', ObservableProcess);
    container.register('ISourceControl', Git);

    const runner =
        args.find(a => a.search('runner') > 0)?.split('=')[1];

    container.register('IRunner', {
        useFactory: () => {
            const runners: Record<Runner, IRunner> = {
                [Runner.WEBPACK]: new Webpack(),
                [Runner.BACKEND]: new Webpack()
            }

            return runners[runner as Runner || 'webpack'];
        }
    })
    container.register('IRunner', Webpack)
}

const hook: Hook<'init'> = function ({ argv }) {
    inject(argv)
}

export default hook