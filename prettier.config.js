// 导出 Prettier 代码格式化配置
export default {
  // 一行的最大字符数，超过此长度会自动换行，默认为 80，官方建议设为 100-120 之间的值
  printWidth: 100, // 设置为 100 个字符
  // 一个 tab 代表的空格数，用于缩进
  tabWidth: 2, // 一个 tab 等于 2 个空格
  // 是否使用 tab 字符代替空格进行缩进，默认为 false（使用空格）
  useTabs: false, // 使用空格而不是 tab 进行缩进
  // 是否在语句末尾添加分号，默认为 true
  semi: false, // 不添加分号（添加理由:更加容易复制添加数据,不用去管理尾行）
  // 是否缩进 Vue 文件中的 <script> 和 <style> 标签内容
  vueIndentScriptAndStyle: true, // 缩进 Vue 文件中的 script 和 style 标签内容
  // 字符串是否使用单引号，默认为 false（使用双引号）
  singleQuote: true, // 使用单引号而不是双引号
  // 对象属性名是否添加引号，'as-needed' 表示只在需要时添加引号
  quoteProps: 'as-needed', // 给对象里的属性名是否要加上引号，默认为as-needed，即根据需要决定，如果不加引号会报错则加，否则不加
  // 是否在对象、数组等结构的最后一个元素后添加尾逗号
  trailingComma: 'none', // 不使用尾逗号（可选值: 'none' | 'es5' | 'all'）
  // 在 JSX 中是否使用单引号
  jsxSingleQuote: true, // 在jsx里是否使用单引号，你看着办
  // 对象字面量的大括号之间是否有空格
  bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  //  prose（散文）的换行方式，'never' 表示不自动换行
  proseWrap: 'never', // 不自动换行 prose（Markdown、HTML 等）内容
  // HTML 空白符的敏感度，'strict' 表示所有空白符都是重要的
  htmlWhitespaceSensitivity: 'strict', // HTML 空白符敏感度设为严格模式
  // 行尾符类型，'auto' 表示自动检测并使用当前操作系统的行尾符
  endOfLine: 'auto' // 自动检测并使用当前操作系统的行尾符（LF 或 CRLF）
}
