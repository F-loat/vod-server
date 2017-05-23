## 评论相关API
### 获取评论列表
#### 接口：`GET` /request/comment/list
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
id | String | 是 | 帖子Id



#### 使用示例

请求参数：

```json
{
  "id": "5923f3ddb74d6d08f4ae8acb"
}
```

返回结果：

```json
{
  "state": 1,
  "content": [
    {
      "_id": "5923f3ddb74d6d08f4ae8acc",
      "updatedAt": "2017-05-23T08:33:33.711Z",
      "createdAt": "2017-05-23T08:33:33.711Z",
      "subject": "5923f3ddb74d6d08f4ae8acb",
      "content": "评论评论评论",
      "commenter": {
        "_id": "5923f3ddb74d6d08f4ae8ac9",
        "stuid": "000000"
      },
      "__v": 0,
      "deleted": false
    }
  ]
}
```
### 新增评论
#### 接口：`POST` /request/comment
#### 参数



参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
id | String | 是 | 帖子Id或视频Id
content | String | 是 | 评论内容
reply | String | 否 | 回复目标



#### 使用示例

请求参数：

```json
{
  "id": "5923f3ddb74d6d08f4ae8acf",
  "content": "发布评论lalala",
  "reply": null
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "__v": 0,
    "updatedAt": "2017-05-23T08:33:33.885Z",
    "createdAt": "2017-05-23T08:33:33.885Z",
    "subject": "5923f3ddb74d6d08f4ae8acf",
    "content": "发布评论lalala",
    "commenter": "5923f3ddb74d6d08f4ae8acd",
    "reply": null,
    "_id": "5923f3ddb74d6d08f4ae8ad1",
    "deleted": false
  }
}
```