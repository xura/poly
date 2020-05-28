import {
    createRxDatabase,
    RxDatabase,
    RxCollection,
    RxJsonSchema,
    RxDocument,
    addRxPlugin
} from 'rxdb';

addRxPlugin(require('rxdb/plugins/server'));
addRxPlugin(require('pouchdb-adapter-memory'));

type HeroDocType = {
    passportId: string;
    firstName: string;
    lastName: string;
    age?: number; // optional
};

type HeroDocMethods = {
    scream: (v: string) => string;
};

type HeroDocument = RxDocument<HeroDocType, HeroDocMethods>;

type HeroCollectionMethods = {
    countAllDocuments: () => Promise<number>;
}

// and then merge all our types
type HeroCollection = RxCollection<HeroDocType, HeroDocMethods, HeroCollectionMethods>;

type MyDatabaseCollections = {
    heroes: HeroCollection
}

type MyDatabase = RxDatabase<MyDatabaseCollections>;

const heroSchema: RxJsonSchema<HeroDocType> = {
    title: 'human schema',
    description: 'describes a human being',
    version: 0,
    keyCompression: true,
    type: 'object',
    properties: {
        passportId: {
            type: 'string',
            primary: true
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        },
        age: {
            type: 'integer'
        }
    },
    required: ['firstName', 'lastName']
};

const heroDocMethods: HeroDocMethods = {
    scream: function (this: HeroDocument, what: string) {
        return this.firstName + ' screams: ' + what.toUpperCase();
    }
};

const heroCollectionMethods: HeroCollectionMethods = {
    countAllDocuments: async function (this: HeroCollection) {
        const allDocs = await this.find().exec();
        return allDocs.length;
    }
};

let db: RxDatabase<MyDatabaseCollections> = null as any;

export const getDb = async (): Promise<RxDatabase<MyDatabaseCollections>> => {

    if (db)
        return Promise.resolve(db);

    db = await createRxDatabase<MyDatabaseCollections>({
        name: 'mydb',
        adapter: 'memory'
    })

    await db.collection({
        name: 'heroes',
        schema: heroSchema,
        methods: heroDocMethods,
        statics: heroCollectionMethods
    })

    db.heroes.postInsert(
        function myPostInsertHook(
            this: HeroCollection, // own collection is bound to the scope
            docData: HeroDocType, // documents data
            doc: HeroDocument // RxDocument
        ) {
            console.log('insert to ' + this.name + '-collection: ' + doc.firstName);
        },
        false // not async
    );

    debugger;
    return Promise.resolve(db);
}
