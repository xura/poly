import * as t from 'io-ts';
import { RProject } from './project';

export const RConfig = t.type({
    projects: t.array(RProject)
})

export type TConfig = t.TypeOf<typeof RConfig>