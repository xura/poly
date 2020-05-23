import webpack from 'webpack';
import { config } from './config';

webpack(config(process.argv[2])).watch({
    aggregateTimeout: 300,
    poll: undefined
}, (err, stats) => {
    if (err || stats.hasErrors()) {
        const errors =
            stats.hasErrors()
            && stats.compilation.errors.map(e => e.message)

        console.log(JSON.stringify(
            (err && [err.toString()]) || errors)
        )
    } else {
        console.log(JSON.stringify(null));
    }
});