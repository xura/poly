import { Observable } from 'rxjs'

export interface IProcess {
    start(definitions: [string, string][]): Observable<[string, string]>
}