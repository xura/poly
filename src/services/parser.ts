const PARSER_ERROR = {
    ERROR_PARSING_JSON_FILE: (fileName: string, error: string) => `Error parsing JSON file ${fileName}\n${error}`
}

export class Parser {
    static JSON = <T>(json: string, fileName: string) => new Promise<[T, Error | null]>((resolve, reject) => {
        try {
            resolve([JSON.parse(json), null]);
        } catch (e) {
            reject([null, PARSER_ERROR.ERROR_PARSING_JSON_FILE(fileName, e)]);
        }
    })
}