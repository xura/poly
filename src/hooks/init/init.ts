import { container } from 'tsyringe'
import { Hook } from '@oclif/config'
import { Webpack, ObservableProcess, Spinnies } from '../../adapters'
import { Config } from '../../core/config'

export const inject = () => {
    container.registerSingleton('IConfig', Config);
    container.registerSingleton('ITerminalList', Spinnies);
    container.register('IRunner', Webpack);
    container.register('IProcess', ObservableProcess);
}

const hook: Hook<'init'> = function () {
    inject()
}

export default hook