const path = require('path');
const fs = require('fs');

const indexMdStr = {};
const mdStr = {};
module.exports = async (obj) => {
  if (!indexMdStr[obj.group]) {
    indexMdStr[obj.group] = '# API文档 \n';
    indexMdStr[obj.group] += `\n## [${obj.group}](./${obj.file}) \n`;
  }
  indexMdStr[obj.group] += `* [${obj.title}](./${obj.file}#${obj.title.replace(/\*/g, '')}) \n`;

  if (!mdStr[obj.group]) {
    mdStr[obj.group] = '';
    mdStr[obj.group] += `## ${obj.group} \n\n`;
  }
  const fields = {};

  mdStr[obj.group] += `### ${obj.title} \n`;
  mdStr[obj.group] += `#### 接口：\`${obj.method.toUpperCase()}\` ${obj.url} \n`;

  if (obj.params) {
    mdStr[obj.group] += '\n#### 参数\n';
    mdStr[obj.group] += '\n参数名 | 类型 | 是否必填 | 说明\n-----|-----|-----|-----\n';
    Object.keys(obj.params).forEach((param) => {
      const paramVal = obj.params[param];
      fields[param] = paramVal.value;
      mdStr[obj.group] += `${param} | ${paramVal.type} | ${paramVal.required ? '是' : '否'} | ${paramVal.desc} \n`;
    });
  }
  mdStr[obj.group] += '\n#### 使用示例\n\n请求参数：\n';

  if (obj.params) {
    mdStr[obj.group] += '\n```json\n';
    mdStr[obj.group] += JSON.stringify(fields, null, 2);
    mdStr[obj.group] += '\n```\n';
  } else {
    mdStr[obj.group] += '无\n';
  }
  mdStr[obj.group] += '\n返回结果：\n\n';

  if (obj.url.indexOf(':') > -1) {
    obj.url = obj.url.replace(/:\w*/g, word =>
      fields[word.substr(1)]);
  }

  const normalizedFields = JSON.parse(JSON.stringify(fields));
  const res = await obj.agent[obj.method](obj.url)
    .set(obj.headers || {})
    .query(normalizedFields)
    .send(normalizedFields)
    .expect(obj.expect);
  mdStr[obj.group] += '```json\n';
  mdStr[obj.group] += JSON.stringify(res.body, null, 2);
  mdStr[obj.group] += '\n```\n';
  mdStr[obj.group] += '\n';

  if (process.env.GEN_DOC > 0) {
    fs.writeFileSync(path.resolve('./docs/', `${obj.file}.md`), mdStr[obj.group]);
    fs.writeFileSync('./docs/index.md', indexMdStr[obj.group]);
  }
  return res;
};
