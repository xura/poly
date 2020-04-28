import * as t from 'io-ts';
import { RProject } from './project';
import { RDevServer } from './dev-server';

export const RConfig = t.type({
    devServer: t.union([RDevServer, t.undefined]),
    projects: t.array(RProject)
})

export type TConfig = t.TypeOf<typeof RConfig>