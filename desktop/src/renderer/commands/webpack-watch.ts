import { start } from '../process';
import { dir } from '../shared/fs';
import { Subject, Observable } from 'rxjs';
import { ObservableProcess } from 'observable-process';

const webpackDir = './src/renderer/webpack';
const webpackCommand = `ts-node ${dir(webpackDir, 'index.ts')} ${dir(webpackDir, 'example.js')}`

export default () => {
    const subject = new Subject();
    const processes: ObservableProcess[] = [];
    return {
        changes: subject,
        stop: () => {
            debugger;
            processes.forEach(p => p.kill())
        },
        start: () => start(
            [["project1", webpackCommand]],
            processes
        ).subscribe((data: any) => subject.next(data))
    }
};