import { of, merge } from 'rxjs';
import { mapTo, delay } from 'rxjs/operators';
import webpackWatch from './commands/webpack-watch';

const example = of(null);

export const alertDoesThisWork = () => alert("DOES THIS WORK");
export const exampleMessage = () => merge(
    example.pipe(mapTo('Hello')),
    example.pipe(mapTo('World!'), delay(1000)),
    example.pipe(mapTo('Goodbye'), delay(2000)),
    example.pipe(mapTo('World!'), delay(3000))
);
export const poly = webpackWatch((data) => {
    console.log(data);
});

poly();
