import { Observable, of, merge, concat } from 'rxjs';
import { createObservableProcess } from 'observable-process';

export const start =
    (definitions: [string, string][]): any => {
        return definitions.reduce((acc, definition) => {
            const process = createObservableProcess(definition[1]);
            const processObservable = new Observable<[string, string]>(observer => {
                process.stdout.on("data", function () {
                    const output = process.stdout.fullText().split("\n");
                    observer.next([
                        definition[0],
                        output[output.length - 2]
                    ])
                });
            })
            return merge(acc, processObservable);
        }, of<[string, string]>())
    }
