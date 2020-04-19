import chalk from 'chalk';

export class Logger {
    static error(message: string) {
        console.log(chalk.red.bold(message));
    }

    static success(message: string) {
        console.log(chalk.green(message));
    }

    static warn(message: string) {
        console.log(chalk.yellow(message));
    }
}