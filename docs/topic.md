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
  "id": "592268fa5a02d9157c985f21",
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
        "_id": "592268fa5a02d9157c985f21",
        "updatedAt": "2017-05-22T04:28:42.882Z",
        "createdAt": "2017-05-22T04:28:42.882Z",
        "title": "测试",
        "content": "测试测试测试",
        "type": "592268fa5a02d9157c985f20",
        "author": {
          "_id": "592268fa5a02d9157c985f1f",
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
  "id": "592268fa5a02d9157c985f24"
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "_id": "592268fa5a02d9157c985f24",
    "updatedAt": "2017-05-22T04:28:42.933Z",
    "createdAt": "2017-05-22T04:28:42.933Z",
    "title": "测试",
    "content": "测试测试测试",
    "type": "592268fa5a02d9157c985f23",
    "author": "592268fa5a02d9157c985f22",
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
  "type": "592268fa5a02d9157c985f26"
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "__v": 0,
    "updatedAt": "2017-05-22T04:28:42.977Z",
    "createdAt": "2017-05-22T04:28:42.977Z",
    "title": "发布",
    "content": "发布发布发布",
    "type": "592268fa5a02d9157c985f26",
    "author": "592268fa5a02d9157c985f25",
    "_id": "592268fa5a02d9157c985f28",
    "sort": 1,
    "deleted": false,
    "lock": false,
    "top": false,
    "visitCount": 0,
    "replyCount": 0
  }
}
```