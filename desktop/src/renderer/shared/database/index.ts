import { getDb } from '../../../main/database';

export const insertHero = () => getDb().then(db => {
    debugger;
    return db.heroes.insert({
        passportId: 'myId',
        firstName: 'piotr',
        lastName: 'potter',
        age: 5
    }).then(document => {
        debugger;
    })
});