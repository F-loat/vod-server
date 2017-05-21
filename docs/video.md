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
      "videos": [],
      "type": {
        "_id": "591f217adabb3e14204bdb88",
        "name": "电影"
      }
    },
    {
      "videos": [],
      "type": {
        "_id": "591f225ceab50b2d78f7164e",
        "name": "电影"
      }
    },
    {
      "videos": [],
      "type": {
        "_id": "591f231f4f32922dbcdf7f1f",
        "name": "电影"
      }
    },
    {
      "videos": [],
      "type": {
        "_id": "591f234a7786ec1c145c87b8",
        "name": "电影"
      }
    },
    {
      "videos": [],
      "type": {
        "_id": "591f23697dc2a916bcdd63c3",
        "name": "电影"
      }
    },
    {
      "videos": [],
      "type": {
        "_id": "591f24fdae51351c94a55805",
        "name": "电影"
      }
    },
    {
      "videos": [],
      "type": {
        "_id": "591f2559cd6c392364d4247a",
        "name": "电影"
      }
    },
    {
      "videos": [],
      "type": {
        "_id": "591f2a790d05d70128829ed0",
        "name": "电影"
      }
    },
    {
      "videos": [],
      "type": {
        "_id": "591f2af0b119a70730e3d92c",
        "name": "电影"
      }
    },
    {
      "videos": [
        {
          "_id": "5921b5cfe1279c04905ee754",
          "title": "测试",
          "posterPath": "poster/2017/5/17/1495381455857"
        }
      ],
      "type": {
        "_id": "5921b5cfe1279c04905ee753",
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
  "type": "5921b5cfe1279c04905ee756",
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
        "_id": "5921b5cfe1279c04905ee757",
        "updatedAt": "2017-05-21T15:44:15.942Z",
        "createdAt": "2017-05-21T15:44:15.942Z",
        "title": "测试",
        "posterPath": "poster/2017/5/17/1495381455941",
        "summary": "测试",
        "year": "2017",
        "creater": {
          "_id": "5921b5cfe1279c04905ee755",
          "stuid": "000000"
        },
        "__v": 0,
        "sort": 7,
        "deleted": false,
        "type": [
          "5921b5cfe1279c04905ee756"
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
  "_id": "5921b5cfe1279c04905ee75a"
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "_id": "5921b5cfe1279c04905ee75a",
    "updatedAt": "2017-05-21T15:44:15.999Z",
    "createdAt": "2017-05-21T15:44:15.999Z",
    "title": "测试",
    "posterPath": "poster/2017/5/17/1495381455994",
    "summary": "测试",
    "year": "2017",
    "creater": "5921b5cfe1279c04905ee758",
    "__v": 0,
    "sort": 7,
    "deleted": false,
    "type": [
      "5921b5cfe1279c04905ee759"
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
  "poster": "poster/2017/5/17/1495381456081",
  "summary": "测试",
  "year": "2017",
  "type": "5921b5d0e1279c04905ee75c",
  "creater": "5921b5d0e1279c04905ee75b",
  "sort": 6
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "__v": 0,
    "updatedAt": "2017-05-21T15:44:16.100Z",
    "createdAt": "2017-05-21T15:44:16.100Z",
    "title": "测试",
    "summary": "测试",
    "year": "2017",
    "creater": "5921b5d0e1279c04905ee75b",
    "_id": "5921b5d0e1279c04905ee75e",
    "sort": 6,
    "deleted": false,
    "type": [
      "5921b5d0e1279c04905ee75c"
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
  "_id": "5921b5d0e1279c04905ee761",
  "title": "修改",
  "aka": "修改,修改",
  "performers": "修改,修改",
  "countries": "修改,修改",
  "directors": "修改,修改",
  "poster": "poster/2017/5/17/1495381456159",
  "summary": "修改",
  "year": "2018",
  "type": "5921b5d0e1279c04905ee760",
  "creater": "5921b5d0e1279c04905ee75f",
  "sort": 6
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "_id": "5921b5d0e1279c04905ee761",
    "updatedAt": "2017-05-21T15:44:16.188Z",
    "createdAt": "2017-05-21T15:44:16.154Z",
    "title": "修改",
    "posterPath": "poster/2017/5/17/1495381456150",
    "summary": "修改",
    "year": "2018",
    "creater": "5921b5d0e1279c04905ee75f",
    "__v": 1,
    "sort": 6,
    "deleted": false,
    "type": [
      "5921b5d0e1279c04905ee760"
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
  "_id": "5921b5d0e1279c04905ee764"
}
```

返回结果：

```json
{
  "state": 1,
  "content": true
}
```