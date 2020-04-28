import { Observable } from 'rxjs'

export interface IProcess {
    start(definitions: [string, string][], errorIdentifier?: string): Observable<[string, string]>
}