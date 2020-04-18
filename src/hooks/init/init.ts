import { container } from 'tsyringe'
import { Hook } from '@oclif/config'
import { Webpack } from '../../adapters'
import { Config } from '../../core/config'

export const inject = () => {
    container.registerSingleton('IConfig', Config);
    container.register('IRunner', Webpack)
}

const hook: Hook<'init'> = function () {
    inject()
}

export default hook