import tool from './tool'

export default function (data) {
  return `
**:hash: 标题** : ${data.name}

**:page_with_curl: 介绍** : ${data.note}

**:link: 链接** : [${data.url}](${data.url})

**:pencil2: Markdown**

\`\`\`
- name: ${data.type}
  list:
  - name: ${data.name}
    note: ${data.note}
    url: ${data.url}
\`\`\`

**:space_invader: JSON**

\`\`\` js
${JSON.stringify(data)}
\`\`\`

> \`${tool.getDate()}\` | 来自 Chrome 插件分享
`.trim()
}
