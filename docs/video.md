## 视频相关API

### 获取视频列表（已分类） `get` /request/video/typed 

返回结果:

```json
{
  "state": 1,
  "content": [
    {
      "videos": [
        {
          "_id": "591ddd97e1bf9b14049ea5ec",
          "title": "测试",
          "posterPath": "poster/2017/5/17/1495129495303"
        }
      ],
      "type": {
        "_id": "591ddd97e1bf9b14049ea5eb",
        "name": "电影"
      }
    }
  ]
}
```

### 获取视频列表 `get` /request/video/list 

#### 参数

参数名 | 类型 | 是否必填 | 说明
-----|-----|-----|-----
type | String | 是 | 视频分类Id 
limit | Number | 否 | 查询条数 
page | Number | 否 | 查询页数 
search | String | 否 | 搜索条件 

#### 使用示例

请求参数: 

```json
{
  "type": "591ddd97e1bf9b14049ea5ee",
  "limit": 10,
  "page": 1,
  "search": "测"
}
```

返回结果:

```json
{
  "state": 1,
  "content": {
    "videos": [
      {
        "_id": "591ddd97e1bf9b14049ea5ef",
        "updatedAt": "2017-05-18T17:44:55.639Z",
        "createdAt": "2017-05-18T17:44:55.639Z",
        "title": "测试",
        "posterPath": "poster/2017/5/17/1495129495636",
        "summary": "测试",
        "year": "2017",
        "creater": {
          "_id": "591ddd97e1bf9b14049ea5ed",
          "stuid": "000000"
        },
        "__v": 0,
        "sort": 7,
        "deleted": false,
        "type": [
          "591ddd97e1bf9b14049ea5ee"
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

### 获取视频详情 `get` /request/video 

#### 参数

参数名 | 类型 | 是否必填 | 说明
-----|-----|-----|-----
_id | String | 是 | 视频Id 

#### 使用示例

请求参数: 

```json
{
  "_id": "591ddd97e1bf9b14049ea5f2"
}
```

返回结果:

```json
{
  "state": 1,
  "content": {
    "_id": "591ddd97e1bf9b14049ea5f2",
    "updatedAt": "2017-05-18T17:44:55.809Z",
    "createdAt": "2017-05-18T17:44:55.809Z",
    "title": "测试",
    "posterPath": "poster/2017/5/17/1495129495807",
    "summary": "测试",
    "year": "2017",
    "creater": "591ddd97e1bf9b14049ea5f0",
    "__v": 0,
    "sort": 7,
    "deleted": false,
    "type": [
      "591ddd97e1bf9b14049ea5f1"
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

### 新增视频* `post` /request/video 

#### 参数

参数名 | 类型 | 是否必填 | 说明
-----|-----|-----|-----
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

请求参数: 

```json
{
  "title": "测试",
  "aka": "测试,测试",
  "performers": "测试,测试",
  "countries": "测试,测试",
  "directors": "测试,测试",
  "poster": "poster/2017/5/17/1495129495879",
  "summary": "测试",
  "year": "2017",
  "type": "591ddd97e1bf9b14049ea5f4",
  "creater": "591ddd97e1bf9b14049ea5f3",
  "sort": 6
}
```

返回结果:

```json
{
  "state": 1,
  "content": true
}
```

### 修改视频* `put` /request/video 

#### 参数

参数名 | 类型 | 是否必填 | 说明
-----|-----|-----|-----
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

请求参数: 

```json
{
  "_id": "591ddd97e1bf9b14049ea5f9",
  "title": "修改",
  "aka": "修改,修改",
  "performers": "修改,修改",
  "countries": "修改,修改",
  "directors": "修改,修改",
  "poster": "poster/2017/5/17/1495129495980",
  "summary": "修改",
  "year": "2018",
  "type": "591ddd97e1bf9b14049ea5f8",
  "creater": "591ddd97e1bf9b14049ea5f7",
  "sort": 6
}
```

返回结果:

```json
{
  "state": 1,
  "content": {
    "_id": "591ddd97e1bf9b14049ea5f9",
    "updatedAt": "2017-05-18T17:44:55.998Z",
    "createdAt": "2017-05-18T17:44:55.973Z",
    "title": "修改",
    "posterPath": "poster/2017/5/17/1495129495969",
    "summary": "修改",
    "year": "2018",
    "creater": "591ddd97e1bf9b14049ea5f7",
    "__v": 0,
    "sort": 6,
    "deleted": false,
    "type": [
      "591ddd97e1bf9b14049ea5f8"
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

### 删除视频* `delete` /request/video 

#### 参数

参数名 | 类型 | 是否必填 | 说明
-----|-----|-----|-----
_id | String | 是 | 视频Id 

#### 使用示例

请求参数: 

```json
{
  "_id": "591ddd98e1bf9b14049ea5fc"
}
```

返回结果:

```json
{
  "state": 1,
  "content": true
}
```

