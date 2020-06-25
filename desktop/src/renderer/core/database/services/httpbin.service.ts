import { Entity } from "../models";

const insertEntity = (body: any): Promise<Entity> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            debugger;
            fetch(`https://httpbin.org/get`).then(response => resolve(body))
        }, 1000)
    })
};

export {
    insertEntity,
};
