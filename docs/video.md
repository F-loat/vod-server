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
          "_id": "5923f3deb74d6d08f4ae8af9",
          "title": "测试",
          "posterPath": "poster/2017/5/17/1495528414944"
        }
      ],
      "type": {
        "_id": "5923f3deb74d6d08f4ae8af8",
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
  "type": "5923f3deb74d6d08f4ae8afb",
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
        "_id": "5923f3deb74d6d08f4ae8afc",
        "updatedAt": "2017-05-23T08:33:34.995Z",
        "createdAt": "2017-05-23T08:33:34.995Z",
        "title": "测试",
        "posterPath": "poster/2017/5/17/1495528414993",
        "summary": "测试",
        "year": "2017",
        "creater": {
          "_id": "5923f3deb74d6d08f4ae8afa",
          "stuid": "000000"
        },
        "__v": 0,
        "sort": 0,
        "deleted": false,
        "type": [
          "5923f3deb74d6d08f4ae8afb"
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
  "_id": "5923f3dfb74d6d08f4ae8aff"
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "_id": "5923f3dfb74d6d08f4ae8aff",
    "updatedAt": "2017-05-23T08:33:35.067Z",
    "createdAt": "2017-05-23T08:33:35.067Z",
    "title": "测试",
    "posterPath": "poster/2017/5/17/1495528415062",
    "summary": "测试",
    "year": "2017",
    "creater": "5923f3dfb74d6d08f4ae8afd",
    "__v": 0,
    "sort": 0,
    "deleted": false,
    "type": [
      "5923f3dfb74d6d08f4ae8afe"
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
  "poster": "poster/2017/5/17/1495528415114",
  "summary": "测试",
  "year": "2017",
  "type": "5923f3dfb74d6d08f4ae8b01",
  "creater": "5923f3dfb74d6d08f4ae8b00",
  "sort": 6
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "__v": 0,
    "updatedAt": "2017-05-23T08:33:35.135Z",
    "createdAt": "2017-05-23T08:33:35.135Z",
    "title": "测试",
    "summary": "测试",
    "year": "2017",
    "creater": "5923f3dfb74d6d08f4ae8b00",
    "_id": "5923f3dfb74d6d08f4ae8b03",
    "sort": 6,
    "deleted": false,
    "type": [
      "5923f3dfb74d6d08f4ae8b01"
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
  "_id": "5923f3dfb74d6d08f4ae8b06",
  "title": "修改",
  "aka": "修改,修改",
  "performers": "修改,修改",
  "countries": "修改,修改",
  "directors": "修改,修改",
  "poster": "poster/2017/5/17/1495528415188",
  "summary": "修改",
  "year": "2018",
  "type": "5923f3dfb74d6d08f4ae8b05",
  "creater": "5923f3dfb74d6d08f4ae8b04",
  "sort": 6
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "_id": "5923f3dfb74d6d08f4ae8b06",
    "updatedAt": "2017-05-23T08:33:35.203Z",
    "createdAt": "2017-05-23T08:33:35.185Z",
    "title": "修改",
    "posterPath": "poster/2017/5/17/1495528415178",
    "summary": "修改",
    "year": "2018",
    "creater": "5923f3dfb74d6d08f4ae8b04",
    "__v": 0,
    "sort": 6,
    "deleted": false,
    "type": [
      "5923f3dfb74d6d08f4ae8b05"
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
  "_id": "5923f3dfb74d6d08f4ae8b09"
}
```

返回结果：

```json
{
  "state": 1,
  "content": true
}
```