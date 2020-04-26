import gitP, { SimpleGit } from 'simple-git/promise';
import { promises } from 'fs';

const wd = process.argv[2];

promises.stat(`${wd}/.git`)
    .then(_ => {
        const git: SimpleGit = gitP(wd);
        try {
            git.push().catch(error => console.log(JSON.stringify(["error", error])));
            console.log(JSON.stringify(null));
        } catch (e) {
            console.log(e.toString())
        }
    })
    .catch(_ => {
        console.log(JSON.stringify([`The following directory is not a git repository:\n${wd}/.git`]))
    });
