import { Entity } from "../models";

const insertEntity = (entity: Entity): Promise<Entity> => fetch(`https://httpbin.org/get`).then(response => entity);

export {
    insertEntity,
};
