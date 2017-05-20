## 论坛相关API
### 获取帖子列表
#### 接口：`GET` /request/topic/list
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
id | String | 是 | 帖子Id
limit | Number | 否 | 查询条数
page | Number | 否 | 查询页数



#### 使用示例

请求参数：

```json
{
  "id": "591ff5568394f309e0e9dbaa",
  "limit": 10,
  "page": 1
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "topics": [
      {
        "_id": "591ff5568394f309e0e9dbaa",
        "updatedAt": "2017-05-20T07:50:46.409Z",
        "createdAt": "2017-05-20T07:50:46.409Z",
        "title": "测试",
        "content": "测试测试测试",
        "type": "591ff5568394f309e0e9dba9",
        "author": {
          "_id": "591ff5568394f309e0e9dba8",
          "stuid": "000000"
        },
        "__v": 0,
        "sort": 0,
        "deleted": false,
        "lock": false,
        "top": false,
        "visitCount": 0,
        "replyCount": 0
      }
    ],
    "totalCount": 1
  }
}
```
### 获取帖子详情
#### 接口：`GET` /request/topic
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
id | String | 是 | 帖子Id



#### 使用示例

请求参数：

```json
{
  "id": "591ff5568394f309e0e9dbad"
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "_id": "591ff5568394f309e0e9dbad",
    "updatedAt": "2017-05-20T07:50:46.435Z",
    "createdAt": "2017-05-20T07:50:46.435Z",
    "title": "测试",
    "content": "测试测试测试",
    "type": "591ff5568394f309e0e9dbac",
    "author": "591ff5568394f309e0e9dbab",
    "__v": 0,
    "sort": 0,
    "deleted": false,
    "lock": false,
    "top": false,
    "visitCount": 0,
    "replyCount": 0
  }
}
```
### 新增帖子
#### 接口：`POST` /request/topic
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
title | String | 是 | 帖子标题
content | String | 是 | 帖子内容
type | String | 是 | 帖子类型



#### 使用示例

请求参数：

```json
{
  "title": "发布",
  "content": "发布发布发布",
  "type": "591ff5568394f309e0e9dbaf"
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "__v": 0,
    "updatedAt": "2017-05-20T07:50:46.476Z",
    "createdAt": "2017-05-20T07:50:46.476Z",
    "title": "发布",
    "content": "发布发布发布",
    "type": "591ff5568394f309e0e9dbaf",
    "author": "591ff5568394f309e0e9dbae",
    "_id": "591ff5568394f309e0e9dbb1",
    "sort": 1,
    "deleted": false,
    "lock": false,
    "top": false,
    "visitCount": 0,
    "replyCount": 0
  }
}
```