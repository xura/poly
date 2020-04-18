import { container } from 'tsyringe'
import { Hook } from '@oclif/config'
import { Config, Webpack } from '../../adapters'

export const inject = () => {
    container.register('IConfig', {
        useFactory: () => new Config()
    })
    container.register('IRunner', Webpack)
}

const hook: Hook<'init'> = function () {
    inject()
}

export default hook