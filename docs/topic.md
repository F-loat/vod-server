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
  "id": "5921b5cfe1279c04905ee73d",
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
        "_id": "5921b5cfe1279c04905ee73d",
        "updatedAt": "2017-05-21T15:44:15.374Z",
        "createdAt": "2017-05-21T15:44:15.374Z",
        "title": "测试",
        "content": "测试测试测试",
        "type": "5921b5cfe1279c04905ee73c",
        "author": {
          "_id": "5921b5cfe1279c04905ee73b",
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
  "id": "5921b5cfe1279c04905ee740"
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "_id": "5921b5cfe1279c04905ee740",
    "updatedAt": "2017-05-21T15:44:15.433Z",
    "createdAt": "2017-05-21T15:44:15.433Z",
    "title": "测试",
    "content": "测试测试测试",
    "type": "5921b5cfe1279c04905ee73f",
    "author": "5921b5cfe1279c04905ee73e",
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
  "type": "5921b5cfe1279c04905ee742"
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "__v": 0,
    "updatedAt": "2017-05-21T15:44:15.506Z",
    "createdAt": "2017-05-21T15:44:15.506Z",
    "title": "发布",
    "content": "发布发布发布",
    "type": "5921b5cfe1279c04905ee742",
    "author": "5921b5cfe1279c04905ee741",
    "_id": "5921b5cfe1279c04905ee744",
    "sort": 1,
    "deleted": false,
    "lock": false,
    "top": false,
    "visitCount": 0,
    "replyCount": 0
  }
}
```