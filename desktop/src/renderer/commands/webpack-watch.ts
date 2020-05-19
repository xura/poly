import { start } from '../process';
import { dir } from '../shared/fs';
import { Observable } from 'rxjs';

const webpackDir = './src/renderer/webpack';
const webpackCommand = `ts-node ${dir(webpackDir, 'index.ts')} ${dir(webpackDir, 'example.js')}`

export default (onData: (data: any) => void) => () => start([["project1", webpackCommand]]).subscribe(onData);