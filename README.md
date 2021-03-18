<h1 align="center">@walrus/commit</h1>

> 采用交互的方式帮你生成规范的提交消息

<p align="center">
  <img width="600" src="./docs/commit.svg">
</p>

本 demo 使用 [svg-term-cli](https://github.com/marionebl/svg-term-cli) 生成。

## 📦 安装

- npm 安装

```bash
npm install @walrus/commit --dev --save
```

- yarn 安装

```bash
yarn add @walrus/commit --dev
```

## 🔨 使用

```sh
npx commit
```

本工具支持使用配置文件修改配置，优先级：

- commit.config.ts
- commit.config.js
- .commitrc.ts
- .commitrc.js

目前支持如下配置

- types 
  - 描述：修改类型配置
  - 类型：`{ name: string; emoji?: string; description: string }[]`
- skipCommit
  - 描述：跳过commit
  - 类型：`boolean`
- skipPush
  - 描述：跳过push
  - 类型：`boolean`

## 内置的修改类型

- 💥 feat: 新功能
- 🐛 fix: 修复BUG
- 🚑 quickfix: 重要补丁
- 🚧 wip: 工作进行中
- 💄 ui: 修改UI或者样式文件
- 📖 docs: 文档相关
- 🔧 config: 修改配置文件
- 🏷️  types: 添加或更新类型(Flow, TypeScript).
- ✏️ typo: 修改错别字
- 🔨 refactor: 代码重构
- ⏪ revert: 回退代码
- 🚚 mv: 移动或重命名文件
- 🔥 remove: 删除代码或文件
- 🗑️  disuse: 废弃或删除
- 🐎 perf: 性能优化
- 🚀 deploy: 部署功能
- 🔖 release: 发布版本
- 🎨 style: 优化代码结构、格式
- 👽 compat: 由于外部API更新导致更新代码
- ✅ test: 添加测试
- 🎬 demo: 演示及示例
- 🚨 lint: 移除 linter 警告
- 🌐 i18n: 国际化
- 🎉 init: 初始化代码
- 🐳 docker: Docker 相关
- 📦 deps: 更新依赖
- ➕ dep-add: 添加依赖
- ➖ dep-rm: 删除依赖
- ⬇️  downgrade: 降级依赖
- ⬆️  upgrade: 升级依赖
- 📌 pushpin: 锁定依赖
- 👷 ci: 添加 CI 构建系统
- 💚 fix-ci: 修复 CI 构建问题
- 🔒 security: 修复安全问题
- 🔀 merge: 分支合并
- 🍎 osx: 修复 macOS 系统下的问题.
- 🐧 linux: 修复 Linux 系统下的问题
- 🏁 windows: 修复 Windows 系统下的问题
- 🤖 android: 修复 Android 系统下的问题
- 🍏 ios: 修复 IOS 系统下的问题
- 📈 analytics: 添加分析或跟踪代码

## commit message 格式如下

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

完整示例

```
💥 feat(login): 完成登录功能

添加登录表单
联调登录接口
...

Reviewed-by: Tom
Refs #133
Close #100
```

## 感谢

- [emojify](https://github.com/mrowa44/emojify)
- [git-commit-emoji-cn](https://github.com/liuchengxu/git-commit-emoji-cn)
- [commitlint](https://github.com/conventional-changelog/commitlint)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [cz-emoji](https://github.com/ngryman/cz-emoji)
- [svg-term-cli](https://github.com/marionebl/svg-term-cli)
- [asciinema](https://github.com/asciinema/asciinema)
