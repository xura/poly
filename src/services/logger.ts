import * as chalk from 'chalk';

export class Logger {
    static error(message: string) {
        console.log(chalk.red.bold(message));
    }
}