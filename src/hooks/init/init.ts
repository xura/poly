import { container } from 'tsyringe'
import { Hook } from '@oclif/config'
import { Webpack, ObservableProcess } from '../../adapters'
import { Config } from '../../core/config'

export const inject = () => {
    container.registerSingleton('IConfig', Config);
    container.register('IRunner', Webpack)
    container.register('IProcess', ObservableProcess)
}

const hook: Hook<'init'> = function () {
    inject()
}

export default hook