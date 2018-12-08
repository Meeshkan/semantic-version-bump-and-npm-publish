import * as util from 'util';
import * as tl from 'azure-pipelines-task-lib/task';

const _exec = require('child_process').exec;
const exec = (cmd: string, opts: any) => new Promise((resolve, reject)=>{
    _exec(cmd, opts, (error: Error, stdout: string, stderr: string) => {
        if (error) {
          reject(error);
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        resolve(true);
      });
}); 

async function run() {
    try {
        const npmAuth: string = tl.getInput('npmauth', true);
        const githubAuth: string = tl.getInput('githubauth', true);
        const org: string = tl.getInput('org', true);
        const repo: string = tl.getInput('repo', true);
        const cwd = tl.getInput('workingdirectory', true);
        await exec(`echo ${npmAuth} > .npmrc`, { cwd, });
        await exec(`npm install -g yarn`, { cwd, });
        await exec(`npm install -g npm-auto-version`, { cwd, });
        await exec(`yarn`, { cwd, });
        await exec(`npm-auto-version`, { cwd, });
        await exec(`yarn publish`, { cwd, });
        await exec(`git remote remove origin`, { cwd, });
        await exec(`git remote add origin https://${githubAuth}@github.com/${org}/${repo}.git`, { cwd, });
        await exec(`git push origin --tags`, { cwd, });
        console.log();
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);   
    }
}

run();