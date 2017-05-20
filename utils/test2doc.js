const path = require('path');
const fs = require('fs');
const json2md = require("json2md");

json2md.converters.a = input => `[${input.title}](${input.href})`;

const groups = {};

exports.test = async (obj) => {
  const { title, file } = obj;

  if (!groups[obj.group]) {
    groups[obj.group] = {
      file,
      mdJson: [{ h2: obj.group }],
      links: [],
    };
  }

  const group = groups[obj.group];
  const mdJson = group.mdJson;
  const fields = {};

  group.links.push({
    a: {
      title,
      href: `./${file}#${title.replace(/\*/g, '')}`,
    },
  });


  mdJson.push({ h3: title });
  mdJson.push({
    h4: `接口：\`${obj.method.toUpperCase()}\` ${obj.url}`,
  });

  if (obj.params) {
    const rows = Object.keys(obj.params).map((param) => {
      const paramVal = obj.params[param];
      const { type, required, desc } = paramVal;
      const requiredText = required ? '是' : '否';
      fields[param] = paramVal.value;
      return [param, type, requiredText, desc];
    });
    mdJson.push({ h4: '参数' });
    mdJson.push({ p: '' });
    mdJson.push({
      table: {
        headers: ['参数名', '类型', '是否必填', '说明'],
        rows,
      },
    });
    mdJson.push({ p: '' });
  }
  mdJson.push({ h4: '使用示例' });
  mdJson.push({
    p: `请求参数：${obj.params ? '' : '无'}`,
  });

  if (obj.params) {
    mdJson.push({
      code: {
        language: 'json',
        content: JSON.stringify(fields, null, 2),
      },
    });
  }
  mdJson.push({ p: '返回结果：' });

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
  mdJson.push({
    code: {
      language: 'json',
      content: JSON.stringify(res.body, null, 2),
    },
  });
  return res;
};

exports.generate = async () => {
  const keys = Object.keys(groups);
  const indexJson = [{ h1: 'API文档' }];
  keys.forEach((key) => {
    const group = groups[key];
    const filePath = path.resolve('./docs/', `${group.file}.md`);

    indexJson.push({
      h2: {
        a: {
          title: key,
          href: `./${group.file}#${key}`,
        },
      }
    });
    indexJson.push({ ul: group.links });
    indexJson.push({ p: '' });

    fs.writeFileSync(filePath, json2md(group.mdJson));
  })
  indexJson.push({ p: '*标题为斜体字的接口需要管理员权限' });
  fs.writeFileSync('./docs/index.md', json2md(indexJson));
}
