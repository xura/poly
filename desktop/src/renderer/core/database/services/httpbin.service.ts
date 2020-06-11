import { Entity } from "../models";

const insertEntity = (): Promise<Entity> => fetch(`https://httpbin.org/get`).then(response => response.json());

export {
    insertEntity,
};
