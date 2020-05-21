import * as t from 'io-ts';
import fs from 'fs';
import path from 'path';
import { either } from 'fp-ts/lib/Either';
import { option } from 'io-ts-types/lib/option'

const resolve = (d: string) => path.resolve(process.cwd(), d);

const RExistentDirectory =
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

// https://github.com/gcanti/io-ts/issues/216#issuecomment-599020040
export function fromEnum<EnumType>(enumName: string, theEnum: Record<string, string | number>) {
    const isEnumValue = (input: unknown): input is EnumType => Object.values<unknown>(theEnum).includes(input);

    return new t.Type<EnumType>(
        enumName,
        isEnumValue,
        (input, context) => (isEnumValue(input) ? t.success(input) : t.failure(input, context)),
        t.identity
    );
}

export enum Runner {
    WEBPACK = "webpack",
    BACKEND = "backend"
}

const RRunner = fromEnum<Runner>("Runner", Runner);

export const RProject = t.type({
    directory: t.union([t.undefined, RExistentDirectory]),
    runner: RRunner,
    entry: t.union([t.string, t.undefined]),
    name: t.string,
    command: t.union([t.string, t.undefined])
});

export type TProject = t.TypeOf<typeof RProject>;