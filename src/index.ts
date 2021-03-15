import execa from 'execa';
import inquirer from 'inquirer';
import { Commit, CommitConfig } from './types';
import { getErrorAndLog, isStageEmpty, getCommitMessage } from './utils';

const { printErrorAndExit, logStep } = getErrorAndLog(`commit`);
export { printErrorAndExit, logStep }

export async function commit(config: CommitConfig = {}) {
  console.log(config);
  const { 
    types: commitTypes = [], 
    skipPush,
    skipCommit
  } = config;

  const types = commitTypes.map((item) => {
    const value = `${item.emoji ? item.emoji + ' ' : ''}` + item.name;
    return {
      name: `${value}: ${item.description}`,
      value
    };
  });

  console.log(types);

  // 未修改任何文件
  const gitStatus = execa.sync('git', ['status', '--porcelain']).stdout;
  if (!gitStatus.length) {
    printErrorAndExit(`未修改任何文件。`);
  }

  // 未暂存文件
  if (isStageEmpty()) {
    printErrorAndExit(`不存在暂存文件。`);
  }

  // 获取message信息
  const reult: Commit = await inquirer.prompt([
    {
      name: 'type',
      message: '请选择提交的类型:',
      type: 'list',
      choices: types,
      validate: (value: string) => {
        if (value) {
          return true;
        }
        return '提交类型不能为空';
      }
    },
    {
      name: 'scope',
      message: '请输入提交的范围(可选):',
      type: 'input'
    },
    {
      name: 'subject',
      message: '请输入提交的描述:',
      type: 'input',
      validate: (value: string) => {
        if (value) {
          return true;
        }
        return '提交简述不能为空';
      }
    },
    {
      name: 'body',
      message: '请输入提交的详细内容(可选):',
      type: 'input'
    },
    {
      name: 'footer',
      message: '请输入提交的页脚(可选):',
      type: 'input'
    }
  ]);

  const message = getCommitMessage(reult);

  logStep(`提交信息`);

  console.log(message);

  if (!skipCommit) {
    logStep(`提交代码`);

    // 提交代码
    await execa.sync('git', ['commit', '--message', `${message}`]);
  }

  
  if (!skipPush && !skipCommit) {
    logStep(`提交代码到远端`);

    // 提交代码到远端
    await execa.sync('git', ['push']);
  }  
}
