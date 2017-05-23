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
  "id": "5923f3deb74d6d08f4ae8ae1",
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
        "_id": "5923f3deb74d6d08f4ae8ae1",
        "updatedAt": "2017-05-23T08:33:34.208Z",
        "createdAt": "2017-05-23T08:33:34.208Z",
        "title": "测试",
        "content": "测试测试测试",
        "type": "5923f3deb74d6d08f4ae8ae0",
        "author": {
          "_id": "5923f3deb74d6d08f4ae8adf",
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
  "id": "5923f3deb74d6d08f4ae8ae4"
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "_id": "5923f3deb74d6d08f4ae8ae4",
    "updatedAt": "2017-05-23T08:33:34.288Z",
    "createdAt": "2017-05-23T08:33:34.288Z",
    "title": "测试",
    "content": "测试测试测试",
    "type": "5923f3deb74d6d08f4ae8ae3",
    "author": "5923f3deb74d6d08f4ae8ae2",
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
  "type": "5923f3deb74d6d08f4ae8ae6"
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "__v": 0,
    "updatedAt": "2017-05-23T08:33:34.344Z",
    "createdAt": "2017-05-23T08:33:34.344Z",
    "title": "发布",
    "content": "发布发布发布",
    "type": "5923f3deb74d6d08f4ae8ae6",
    "author": "5923f3deb74d6d08f4ae8ae5",
    "_id": "5923f3deb74d6d08f4ae8ae8",
    "sort": 1,
    "deleted": false,
    "lock": false,
    "top": false,
    "visitCount": 0,
    "replyCount": 0
  }
}
```