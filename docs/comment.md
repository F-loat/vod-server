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
  "id": "592268fa5a02d9157c985f0b"
}
```

返回结果：

```json
{
  "state": 1,
  "content": [
    {
      "_id": "592268fa5a02d9157c985f0c",
      "updatedAt": "2017-05-22T04:28:42.549Z",
      "createdAt": "2017-05-22T04:28:42.549Z",
      "subject": "592268fa5a02d9157c985f0b",
      "content": "评论评论评论",
      "commenter": {
        "_id": "592268fa5a02d9157c985f09",
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
  "id": "592268fa5a02d9157c985f0f",
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
    "updatedAt": "2017-05-22T04:28:42.670Z",
    "createdAt": "2017-05-22T04:28:42.670Z",
    "subject": "592268fa5a02d9157c985f0f",
    "content": "发布评论lalala",
    "commenter": "592268fa5a02d9157c985f0d",
    "reply": null,
    "_id": "592268fa5a02d9157c985f11",
    "deleted": false
  }
}
```