import { container } from 'tsyringe'
import { Hook } from '@oclif/config'
import { Config } from '../../adapters'

export const inject = () => {
    container.register('IConfig', Config)
}

const hook: Hook<'init'> = function () {
    inject()
}

export default hook