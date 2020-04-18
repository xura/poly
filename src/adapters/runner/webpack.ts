import { IRunner } from '../../interfaces';
import { Logger as log } from '../../services';

export class Webpack implements IRunner {
    runAll(): void {
        log.success("Run All")
    }
    runSingle(): void {

    }

}