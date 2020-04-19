import t from 'io-ts';
import { failure } from 'io-ts/lib/PathReporter';
import { pipe } from 'fp-ts/lib/pipeable'
import { Either, fold, left, right } from 'fp-ts/lib/Either'

const PARSER_ERROR = {
    ERROR_PARSING_JSON_FILE: (fileName: string, error: string) => `Error parsing JSON file ${fileName}\n${error}`,
    ERROR_DECODING_JSON: (errors: t.ValidationError[], fileName: string) => [
        `There was a mismatched type while decoding the file ${fileName}`,
        ...failure(errors)
    ].join("\n")
}

type TDecoder<A> = (i: unknown) => Either<t.Errors, A>;

export class Parser {
    static JSON = <T>(json: string, fileName: string, decoder: TDecoder<T>) =>
        new Promise<Either<string, T>>(resolve => {
            try {
                const parsed = JSON.parse(json);
                pipe(
                    decoder(parsed),
                    fold(
                        errors => resolve(
                            left(PARSER_ERROR.ERROR_DECODING_JSON(errors, fileName))
                        ),
                        decoded => resolve(right(decoded))
                    )
                );
            } catch (e) {
                resolve(left(PARSER_ERROR.ERROR_PARSING_JSON_FILE(fileName, e)));
            }
        })
}