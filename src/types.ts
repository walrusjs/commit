export interface Commit {
  type: string;
  scope?: string;
  subject: string;
  body?: string;
  footer?: string;
}

export interface CommitType {
  name: string;
  emoji?: string;
  description: string;
}

export interface CommitConfig {
  /**
   * 跳过提交
   */
  skipCommit?: boolean;
   /**
   * 跳过提交到远程
   */
  skipPush?: boolean;
  /**
   * commit message types
   */
  types?: CommitType[]
}