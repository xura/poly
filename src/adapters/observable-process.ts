import { IProcess } from '../interfaces/IProcess';
import { Observable, of, merge } from 'rxjs';
import { createObservableProcess } from 'observable-process';

export class ObservableProcess implements IProcess {
    start(definitions: [string, string][]): Observable<[string, string]> {
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
        }, of<[string, string]>());
    }

}