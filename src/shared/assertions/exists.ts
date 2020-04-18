import { AssertionError } from 'assert'

export function exists(value: any): asserts value is object {
    if (typeof value === "undefined") {
        throw new AssertionError({
            message: `${value} is undefined`
        });
    }
}