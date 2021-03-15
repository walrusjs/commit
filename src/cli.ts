#!/usr/bin/env node
import { cac } from 'cac';
import { joycon } from '@walrus/cli-utils';
import { commit, logStep } from './';
import { CommitConfig } from './types';
import { DEFAULT_CONFIG_FILES, DEFAULT_TYPES } from './config';

const cli = cac(`commit`);

cli
  .command('[...entries]')
  .option(
    '--skip-commit',
    `[boolean] 是否跳过 git commit`,
    {
      default: false
    }
  )
  .option(
    '--skip-push',
    `[boolean] 是否跳过 git push`,
    {
      default: false
    }
  )
  .action((entries: string[], opts: any) => {
    const {
      data = {}
    } = joycon.loadSync({
      files: DEFAULT_CONFIG_FILES,
      cwd: process.cwd(),
      packageKey: 'commit'
    });

    const config: CommitConfig = {
      ...data,
      ...opts
    }

    if (
      !Array.isArray(config.types) ||
      config.types.length === 0
    ) {
      config.types = DEFAULT_TYPES;
    }

    commit(config)
      .then(() => {
        logStep(`操作成功`);
        process.exit(0);
      })
      .catch(() => {
        logStep(`操作失败`);
        process.exit(1);
      });
  })

cli.help();
cli.version(require('../package.json').version);
cli.parse();
