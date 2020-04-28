import * as t from 'io-ts';

export const RDevServer = t.type({
    dir: t.string,
    port: t.number
})

export type TDevServer = t.TypeOf<typeof RDevServer>