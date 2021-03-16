import { Commit } from './types';
import { execa, chalk } from '@walrus/cli-utils';

export function getErrorAndLog(prefix: string) {
  function logStep(name: string) {
    console.log(`${chalk.gray(`>> ${prefix}:`)} ${chalk.magenta.bold(name)}`);
  }

  function printErrorAndExit(message: string) {
    console.log(chalk.red(`>> ${prefix}: ${message}`));
    process.exit(1);
  }

  return {
    logStep,
    printErrorAndExit
  };
}

/**
 * 判断是否存在暂存文件
 * @returns
 */
export function isStageEmpty() {
  return execa.sync('git', ['diff', '--cached']).stdout === '';
}

/**
 * 获取提交的信息
 * @param info 需要解析的配置
 * @returns 拼接的提交消息
 * @example
 *   🐛 fix(login): 修复登录按钮无法点击
 *
 *   详细的描述信息
 *
 *   Close #12
 */
export const getCommitMessage = (info: Commit) => {
  let message = `${info.type}`;

  if (info.scope) {
    message += `(${info.scope}): ${info.subject}`;
  } else {
    message += `: ${info.subject}`;
  }

  if (info.body) {
    const bodys = info.body.split('|');

    const bodyMessage = bodys.reduce((prev, curr, index) => {
      let msg = prev;
      if (index === 0) {
        msg += `\n\n${curr.trim()}`;
      } else {
        msg += `\n${curr.trim()}`;
      }
      return msg;
    }, '');

    message += bodyMessage;
  }

  if (info.footer) {
    const footers = info.footer.split('|');

    const footerMessage = footers.reduce((prev, curr, index) => {
      let msg = prev;
      if (index === 0) {
        msg += `\n\n${curr.trim()}`;
      } else {
        msg += `\n${curr.trim()}`;
      }
      return msg;
    }, '');

    message += footerMessage;
  }

  return message;
};
