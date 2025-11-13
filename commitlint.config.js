/** @type { import('cz-git').UserConfig } */
// 导出 Commitlint 配置对象（使用 cz-git 类型定义）
export default {
  // 继承的配置：使用 Conventional Commits 规范配置
  extends: ['@commitlint/config-conventional'],
  // 提交信息验证规则配置
  rules: {
    // 提交类型枚举规则：限制提交类型必须在指定的类型列表中
    'type-enum': [
      2, // 错误级别：2 表示错误（必须遵守），0 表示关闭，1 表示警告
      'always', // 应用条件：always 表示总是应用此规则
      [
        // 允许的提交类型列表
        'feat', // 新功能
        'fix', // 修复 bug
        'perf', // 性能优化
        'style', // 代码格式（不影响代码运行的变动）
        'docs', // 文档更新
        'test', // 测试相关
        'refactor', // 代码重构
        'build', // 构建系统或外部依赖的变动
        'ci', // CI 配置文件和脚本的变动
        'init', // 初始化项目
        'chore', // 其他修改（不修改 src 或 test 文件）
        'revert', // 回退提交
        'wip', // 工作进行中（Work In Progress）
        'workflow', // 工作流相关
        'types', // 类型定义相关
        'release' // 发布版本
      ]
    ],
    // 提交主题大小写规则：0 表示关闭大小写检查
    'subject-case': [0] // 允许提交主题使用任何大小写格式
  },
  // cz-git 交互式提示配置
  prompt: {
    // 命令别名配置：定义快捷命令
    alias: { fd: 'docs: fix typos' }, // 输入 fd 等同于 'docs: fix typos'
    // 交互式提示消息配置
    messages: {
      type: '选择你要提交的类型 :', // 选择提交类型的提示信息
      scope: '选择一个提交范围（可选）:', // 选择提交范围的提示信息
      customScope: '请输入自定义的提交范围 :', // 自定义提交范围的提示信息
      subject: '填写简短精炼的变更描述 :\n', // 填写提交主题的提示信息
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n', // 填写提交详情的提示信息
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n', // 填写破坏性变更的提示信息
      footerPrefixesSelect: '选择关联issue前缀（可选）:', // 选择 issue 前缀的提示信息
      customFooterPrefix: '输入自定义issue前缀 :', // 自定义 issue 前缀的提示信息
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n', // 填写关联 issue 的提示信息
      confirmCommit: '是否提交或修改commit ?' // 确认提交的提示信息
    },
    // 提交类型配置列表
    types: [
      { value: 'feat', name: 'feat:  🤩 新增功能 | A new feature', emoji: ':sparkles:' }, // 新功能类型
      { value: 'fix', name: 'fix:   🐛 修复缺陷 | A bug fix', emoji: ':bug:' }, // 修复 bug 类型
      { value: 'docs', name: 'docs:  📝 文档更新 | Documentation only changes', emoji: ':memo:' }, // 文档更新类型
      {
        value: 'style', // 提交类型值
        name: 'style: 🎨 代码格式 | Changes that do not affect the meaning of the code', // 类型显示名称
        emoji: ':lipstick:' // 类型对应的 emoji
      },
      {
        value: 'refactor', // 代码重构类型
        name: 'refactor:  ♻️  代码重构 | A code change that neither fixes a bug nor adds a feature', // 类型显示名称
        emoji: ':recycle:' // 类型对应的 emoji
      },
      {
        value: 'perf', // 性能优化类型
        name: 'perf:  ⚡ 性能提升 | A code change that improves performance', // 类型显示名称
        emoji: ':zap:' // 类型对应的 emoji
      },
      {
        value: 'test', // 测试相关类型
        name: 'test:  ✅ 测试相关 | Adding missing tests or correcting existing tests', // 类型显示名称
        emoji: ':white_check_mark:' // 类型对应的 emoji
      },
      {
        value: 'build', // 构建相关类型
        name: 'build:  📦️ 构建相关 | Changes that affect the build system or external dependencies', // 类型显示名称
        emoji: ':package:' // 类型对应的 emoji
      },
      {
        value: 'ci', // 持续集成类型
        name: 'ci:  🎡 持续集成 | Changes to our CI configuration files and scripts', // 类型显示名称
        emoji: ':ferris_wheel:' // 类型对应的 emoji
      },
      { value: 'revert', name: 'revert:  ⏪️ 回退代码 | Revert to a commit', emoji: ':rewind:' }, // 回退代码类型
      {
        value: 'chore', // 其他修改类型
        name: 'chore:  🔨 其他修改 | Other changes that do not modify src or test files', // 类型显示名称
        emoji: ':hammer:' // 类型对应的 emoji
      }
    ],
    // 是否在提交信息中使用 emoji
    useEmoji: true, // 启用 emoji 显示
    // emoji 对齐方式
    emojiAlign: 'center', // 居中对齐 emoji
    // 是否启用 AI 功能
    useAI: false, // 关闭 AI 辅助功能
    // AI 生成建议的数量
    aiNumber: 1, // AI 生成建议的数量为 1
    // 主题颜色代码
    themeColorCode: '', // 空字符串表示使用默认主题颜色
    // 预定义的提交范围列表
    scopes: [], // 空数组表示没有预定义的范围，需要自定义
    // 是否允许自定义提交范围
    allowCustomScopes: true, // 允许用户自定义提交范围
    // 是否允许空的提交范围
    allowEmptyScopes: true, // 允许提交时不指定范围
    // 自定义范围选项的对齐方式
    customScopesAlign: 'bottom', // 自定义范围选项显示在底部
    // 自定义范围的别名
    customScopesAlias: 'custom', // 自定义范围的别名为 'custom'
    // 空范围的别名
    emptyScopesAlias: 'empty', // 空范围的别名为 'empty'
    // 是否将提交主题转为大写
    upperCaseSubject: false, // 不自动将提交主题转为大写
    // 是否标记破坏性变更模式
    markBreakingChangeMode: false, // 关闭破坏性变更标记模式
    // 允许包含破坏性变更的提交类型
    allowBreakingChanges: ['feat', 'fix'], // 只有 feat 和 fix 类型允许包含破坏性变更
    // 换行字符数限制
    breaklineNumber: 100, // 每行最多 100 个字符后换行
    // 换行分隔符
    breaklineChar: '|', // 使用 '|' 作为换行分隔符
    // 跳过的提示问题列表
    skipQuestions: [], // 空数组表示不跳过任何问题
    // issue 前缀配置列表
    issuePrefixes: [
      // 如果使用 gitee 作为开发管理
      { value: 'link', name: 'link:     链接 ISSUES 进行中' }, // 链接 issue 进行中的前缀
      { value: 'closed', name: 'closed:   标记 ISSUES 已完成' } // 标记 issue 已完成的前缀
    ],
    // 自定义 issue 前缀选项的对齐方式
    customIssuePrefixAlign: 'top', // 自定义 issue 前缀选项显示在顶部
    // 空 issue 前缀的别名
    emptyIssuePrefixAlias: 'skip', // 空 issue 前缀的别名为 'skip'
    // 自定义 issue 前缀的别名
    customIssuePrefixAlias: 'custom', // 自定义 issue 前缀的别名为 'custom'
    // 是否允许自定义 issue 前缀
    allowCustomIssuePrefix: true, // 允许用户自定义 issue 前缀
    // 是否允许空的 issue 前缀
    allowEmptyIssuePrefix: true, // 允许提交时不指定 issue 前缀
    // 是否在确认提交时使用颜色高亮
    confirmColorize: true, // 启用确认提交时的颜色高亮
    // 范围覆盖配置
    scopeOverrides: undefined, // 未定义，使用默认配置
    // 默认的提交详情内容
    defaultBody: '', // 空字符串表示没有默认详情
    // 默认的关联 issue
    defaultIssues: '', // 空字符串表示没有默认 issue
    // 默认的提交范围
    defaultScope: '', // 空字符串表示没有默认范围
    // 默认的提交主题
    defaultSubject: '' // 空字符串表示没有默认主题
  }
}
