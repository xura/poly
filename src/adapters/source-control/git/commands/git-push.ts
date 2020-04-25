import gitP, { SimpleGit } from 'simple-git/promise';

const git: SimpleGit = gitP(process.argv[2]);
git.push()
    .then(_ => console.log(JSON.stringify(null)))
    .catch(error => console.log(JSON.stringify(["error", error])));