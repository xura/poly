import path from 'path';

export const cwd = (d: string) => path.resolve(process.cwd(), d);
