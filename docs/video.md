## 视频相关API
### 获取分类视频列表
#### 接口：`GET` /request/video/typed
#### 使用示例

请求参数：无


返回结果：

```json
{
  "state": 1,
  "content": [
    {
      "videos": [
        {
          "_id": "591feb05c9984406244a651c",
          "title": "测试",
          "posterPath": "poster/2017/5/17/1495264005199"
        }
      ],
      "type": {
        "_id": "591feb05c9984406244a651b",
        "name": "电影"
      }
    }
  ]
}
```
### 获取视频列表
#### 接口：`GET` /request/video/list
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
type | String | 是 | 视频分类Id
limit | Number | 否 | 查询条数
page | Number | 否 | 查询页数
search | String | 否 | 搜索条件



#### 使用示例

请求参数：

```json
{
  "type": "591feb05c9984406244a651e",
  "limit": 10,
  "page": 1,
  "search": "测"
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "videos": [
      {
        "_id": "591feb05c9984406244a651f",
        "updatedAt": "2017-05-20T07:06:45.231Z",
        "createdAt": "2017-05-20T07:06:45.231Z",
        "title": "测试",
        "posterPath": "poster/2017/5/17/1495264005231",
        "summary": "测试",
        "year": "2017",
        "creater": {
          "_id": "591feb05c9984406244a651d",
          "stuid": "000000"
        },
        "__v": 0,
        "sort": 0,
        "deleted": false,
        "type": [
          "591feb05c9984406244a651e"
        ],
        "wishCount": 0,
        "commentsCount": 0,
        "collectCount": 0,
        "directors": [
          "测试",
          "测试"
        ],
        "countries": [
          "测试",
          "测试"
        ],
        "performers": [
          "测试",
          "测试"
        ],
        "aka": [
          "测试",
          "测试"
        ]
      }
    ],
    "totalCount": 1
  }
}
```
### 获取视频详情
#### 接口：`GET` /request/video
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
_id | String | 是 | 视频Id



#### 使用示例

请求参数：

```json
{
  "_id": "591feb05c9984406244a6522"
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "_id": "591feb05c9984406244a6522",
    "updatedAt": "2017-05-20T07:06:45.248Z",
    "createdAt": "2017-05-20T07:06:45.248Z",
    "title": "测试",
    "posterPath": "poster/2017/5/17/1495264005247",
    "summary": "测试",
    "year": "2017",
    "creater": "591feb05c9984406244a6520",
    "__v": 0,
    "sort": 0,
    "deleted": false,
    "type": [
      "591feb05c9984406244a6521"
    ],
    "wishCount": 0,
    "commentsCount": 0,
    "collectCount": 0,
    "directors": [
      "测试",
      "测试"
    ],
    "countries": [
      "测试",
      "测试"
    ],
    "performers": [
      "测试",
      "测试"
    ],
    "aka": [
      "测试",
      "测试"
    ]
  }
}
```
### *新增视频*
#### 接口：`POST` /request/video
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
title | String | 是 | 标题
aka | String | 是 | 关键字
performers | String | 是 | 演员
countries | String | 是 | 国家
directors | String | 是 | 导演
poster | File | 是 | 海报
summary | String | 是 | 描述
year | String | 是 | 年份
type | String | 是 | 类型
creater | String | 是 | 创建人
sort | String | 是 | 排序值



#### 使用示例

请求参数：

```json
{
  "title": "测试",
  "aka": "测试,测试",
  "performers": "测试,测试",
  "countries": "测试,测试",
  "directors": "测试,测试",
  "poster": "poster/2017/5/17/1495264005265",
  "summary": "测试",
  "year": "2017",
  "type": "591feb05c9984406244a6524",
  "creater": "591feb05c9984406244a6523",
  "sort": 6
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "__v": 0,
    "updatedAt": "2017-05-20T07:06:45.271Z",
    "createdAt": "2017-05-20T07:06:45.271Z",
    "title": "测试",
    "summary": "测试",
    "year": "2017",
    "creater": "591feb05c9984406244a6523",
    "_id": "591feb05c9984406244a6526",
    "sort": 6,
    "deleted": false,
    "type": [
      "591feb05c9984406244a6524"
    ],
    "wishCount": 0,
    "commentsCount": 0,
    "collectCount": 0,
    "directors": [
      "测试",
      "测试"
    ],
    "countries": [
      "测试",
      "测试"
    ],
    "performers": [
      "测试",
      "测试"
    ],
    "aka": [
      "测试",
      "测试"
    ]
  }
}
```
### *修改视频*
#### 接口：`PUT` /request/video
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
_id | String | 是 | 视频Id
title | String | 是 | 标题
aka | String | 是 | 关键字
performers | String | 是 | 演员
countries | String | 是 | 国家
directors | String | 是 | 导演
poster | File | 是 | 海报
summary | String | 是 | 描述
year | String | 是 | 年份
type | String | 是 | 类型
creater | String | 是 | 创建人
sort | String | 是 | 排序值



#### 使用示例

请求参数：

```json
{
  "_id": "591feb05c9984406244a6529",
  "title": "修改",
  "aka": "修改,修改",
  "performers": "修改,修改",
  "countries": "修改,修改",
  "directors": "修改,修改",
  "poster": "poster/2017/5/17/1495264005287",
  "summary": "修改",
  "year": "2018",
  "type": "591feb05c9984406244a6528",
  "creater": "591feb05c9984406244a6527",
  "sort": 6
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "_id": "591feb05c9984406244a6529",
    "updatedAt": "2017-05-20T07:06:45.297Z",
    "createdAt": "2017-05-20T07:06:45.286Z",
    "title": "修改",
    "posterPath": "poster/2017/5/17/1495264005285",
    "summary": "修改",
    "year": "2018",
    "creater": "591feb05c9984406244a6527",
    "__v": 0,
    "sort": 6,
    "deleted": false,
    "type": [
      "591feb05c9984406244a6528"
    ],
    "wishCount": 0,
    "commentsCount": 0,
    "collectCount": 0,
    "directors": [
      "修改",
      "修改"
    ],
    "countries": [
      "修改",
      "修改"
    ],
    "performers": [
      "修改",
      "修改"
    ],
    "aka": [
      "修改",
      "修改"
    ]
  }
}
```
### *删除视频*
#### 接口：`DELETE` /request/video
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
_id | String | 是 | 视频Id



#### 使用示例

请求参数：

```json
{
  "_id": "591feb05c9984406244a652c"
}
```

返回结果：

```json
{
  "state": 1,
  "content": true
}
```