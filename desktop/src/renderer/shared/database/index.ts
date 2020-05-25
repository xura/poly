import { Maybe, Nothing, Just } from 'purify-ts';

export const maybeTest = (arg: number): Maybe<Number> => {
    const val = arg === 0 ? Just(arg) : Nothing;
    debugger;
    return val;
}