import * as t from 'io-ts';
import * as fs from 'fs';
import * as path from 'path';
import { either } from 'fp-ts/lib/Either';

const resolve = (d: string) => path.resolve(process.cwd(), d);

const ExistentDirectory =
    new t.Type<string, string, unknown>(
        'ExistentDirectory',
        (u): u is string => fs.existsSync(resolve(u as string)),
        (u, c) =>
            either.chain(t.string.validate(u, c), (s) =>
                !fs.existsSync(resolve(s))
                    ? t.failure(u, c, `Directory does not exist: ${resolve(s)}`)
                    : t.success(resolve(s))),
        a => a
    )

export const RProject = t.type({
    directory: ExistentDirectory
});

export type TProject = t.TypeOf<typeof RProject>;