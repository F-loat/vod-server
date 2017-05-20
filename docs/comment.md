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
  "id": "591feb04c9984406244a64f3"
}
```

返回结果：

```json
{
  "state": 1,
  "content": []
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
  "id": "591feb04c9984406244a64f7",
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
    "updatedAt": "2017-05-20T07:06:44.929Z",
    "createdAt": "2017-05-20T07:06:44.929Z",
    "subject": "591feb04c9984406244a64f7",
    "content": "发布评论lalala",
    "commenter": "591feb04c9984406244a64f5",
    "reply": null,
    "_id": "591feb04c9984406244a64f9",
    "deleted": false
  }
}
```