import { IProcess } from '../interfaces/IProcess';
import { Observable, of, merge } from 'rxjs';
import { createObservableProcess } from 'observable-process';

export class ObservableProcess implements IProcess {
    start = (definitions: [string, string][], errorIdentifier?: string): Observable<[string, string]> =>
        definitions.reduce((acc, definition) => {
            const process = createObservableProcess(definition[1]);
            const processObservable = new Observable<[string, string]>(observer => {
                process.stdout.on("data", function () {
                    const output = process.stdout.fullText().split("\n");
                    const error = errorIdentifier && output.filter(line => line.search(errorIdentifier) > 0);
                    observer.next([
                        definition[0],
                        error?.[error.length - 1] || output[output.length - 2]
                    ])
                });
            })
            return merge(acc, processObservable);
        }, of<[string, string]>())

}