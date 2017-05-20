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
          "_id": "591ff5568394f309e0e9dbc1",
          "title": "测试",
          "posterPath": "poster/2017/5/17/1495266646633"
        }
      ],
      "type": {
        "_id": "591ff5568394f309e0e9dbc0",
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
  "type": "591ff5568394f309e0e9dbc3",
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
        "_id": "591ff5568394f309e0e9dbc4",
        "updatedAt": "2017-05-20T07:50:46.694Z",
        "createdAt": "2017-05-20T07:50:46.694Z",
        "title": "测试",
        "posterPath": "poster/2017/5/17/1495266646693",
        "summary": "测试",
        "year": "2017",
        "creater": {
          "_id": "591ff5568394f309e0e9dbc2",
          "stuid": "000000"
        },
        "__v": 0,
        "sort": 0,
        "deleted": false,
        "type": [
          "591ff5568394f309e0e9dbc3"
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
  "_id": "591ff5568394f309e0e9dbc7"
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "_id": "591ff5568394f309e0e9dbc7",
    "updatedAt": "2017-05-20T07:50:46.717Z",
    "createdAt": "2017-05-20T07:50:46.717Z",
    "title": "测试",
    "posterPath": "poster/2017/5/17/1495266646717",
    "summary": "测试",
    "year": "2017",
    "creater": "591ff5568394f309e0e9dbc5",
    "__v": 0,
    "sort": 0,
    "deleted": false,
    "type": [
      "591ff5568394f309e0e9dbc6"
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
  "poster": "poster/2017/5/17/1495266646751",
  "summary": "测试",
  "year": "2017",
  "type": "591ff5568394f309e0e9dbc9",
  "creater": "591ff5568394f309e0e9dbc8",
  "sort": 6
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "__v": 0,
    "updatedAt": "2017-05-20T07:50:46.767Z",
    "createdAt": "2017-05-20T07:50:46.767Z",
    "title": "测试",
    "summary": "测试",
    "year": "2017",
    "creater": "591ff5568394f309e0e9dbc8",
    "_id": "591ff5568394f309e0e9dbcb",
    "sort": 6,
    "deleted": false,
    "type": [
      "591ff5568394f309e0e9dbc9"
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
  "_id": "591ff5568394f309e0e9dbce",
  "title": "修改",
  "aka": "修改,修改",
  "performers": "修改,修改",
  "countries": "修改,修改",
  "directors": "修改,修改",
  "poster": "poster/2017/5/17/1495266646786",
  "summary": "修改",
  "year": "2018",
  "type": "591ff5568394f309e0e9dbcd",
  "creater": "591ff5568394f309e0e9dbcc",
  "sort": 6
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "_id": "591ff5568394f309e0e9dbce",
    "updatedAt": "2017-05-20T07:50:46.796Z",
    "createdAt": "2017-05-20T07:50:46.785Z",
    "title": "修改",
    "posterPath": "poster/2017/5/17/1495266646783",
    "summary": "修改",
    "year": "2018",
    "creater": "591ff5568394f309e0e9dbcc",
    "__v": 0,
    "sort": 6,
    "deleted": false,
    "type": [
      "591ff5568394f309e0e9dbcd"
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
  "_id": "591ff5568394f309e0e9dbd1"
}
```

返回结果：

```json
{
  "state": 1,
  "content": true
}
```