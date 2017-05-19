## 分类相关API
### 获取分类列表
#### 接口：`GET` /request/type/list
#### 参数
参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
type | String | 否 | 分类类型
#### 使用示例

请求参数：

```json
{
  "type": "video"
}
```

返回结果：

```json
{
  "state": 1,
  "content": [
    {
      "_id": "591f217adabb3e14204bdb88",
      "updatedAt": "2017-05-19T16:46:50.986Z",
      "createdAt": "2017-05-19T16:46:50.986Z",
      "name": "电影",
      "type": "video",
      "creater": null,
      "__v": 0,
      "sort": 6,
      "deleted": false
    },
    {
      "_id": "591f225ceab50b2d78f7164e",
      "updatedAt": "2017-05-19T16:50:36.143Z",
      "createdAt": "2017-05-19T16:50:36.143Z",
      "name": "电影",
      "type": "video",
      "creater": null,
      "__v": 0,
      "sort": 6,
      "deleted": false
    },
    {
      "_id": "591f231f4f32922dbcdf7f1f",
      "updatedAt": "2017-05-19T16:53:51.270Z",
      "createdAt": "2017-05-19T16:53:51.270Z",
      "name": "电影",
      "type": "video",
      "creater": null,
      "__v": 0,
      "sort": 6,
      "deleted": false
    },
    {
      "_id": "591f234a7786ec1c145c87b8",
      "updatedAt": "2017-05-19T16:54:34.642Z",
      "createdAt": "2017-05-19T16:54:34.642Z",
      "name": "电影",
      "type": "video",
      "creater": null,
      "__v": 0,
      "sort": 6,
      "deleted": false
    },
    {
      "_id": "591f23697dc2a916bcdd63c3",
      "updatedAt": "2017-05-19T16:55:05.987Z",
      "createdAt": "2017-05-19T16:55:05.987Z",
      "name": "电影",
      "type": "video",
      "creater": null,
      "__v": 0,
      "sort": 6,
      "deleted": false
    },
    {
      "_id": "591f24fdae51351c94a55805",
      "updatedAt": "2017-05-19T17:01:49.815Z",
      "createdAt": "2017-05-19T17:01:49.815Z",
      "name": "电影",
      "type": "video",
      "creater": null,
      "__v": 0,
      "sort": 6,
      "deleted": false
    },
    {
      "_id": "591f2558cd6c392364d42477",
      "updatedAt": "2017-05-19T17:03:20.826Z",
      "createdAt": "2017-05-19T17:03:20.826Z",
      "name": "电影",
      "type": "video",
      "creater": {
        "_id": "591f2558cd6c392364d42476",
        "stuid": "000000"
      },
      "__v": 0,
      "sort": 7,
      "deleted": false
    }
  ]
}
```
### *新增分类*
#### 接口：`POST` /request/type
#### 参数
参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
name | String | 是 | 分类名称
type | String | 是 | 分类类型
sort | Number | 否 | 排序值
#### 使用示例

请求参数：

```json
{
  "name": "电影",
  "type": "video",
  "sort": 6
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "__v": 0,
    "updatedAt": "2017-05-19T17:03:21.025Z",
    "createdAt": "2017-05-19T17:03:21.025Z",
    "name": "电影",
    "type": "video",
    "creater": "591f2558cd6c392364d42478",
    "_id": "591f2559cd6c392364d4247a",
    "sort": 6,
    "deleted": false
  }
}
```
### 新增分类
#### 接口：`POST` /request/type
#### 参数
参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
_id | String | 是 | 分类id
name | String | 是 | 分类名称
sort | Number | 否 | 排序值
#### 使用示例

请求参数：

```json
{
  "_id": "591f2559cd6c392364d4247c",
  "name": "综艺",
  "sort": 12
}
```

返回结果：

```json
{
  "state": 1,
  "content": {
    "__v": 0,
    "updatedAt": "2017-05-19T17:03:21.121Z",
    "createdAt": "2017-05-19T17:03:21.121Z",
    "name": "综艺",
    "creater": "591f2559cd6c392364d4247b",
    "_id": "591f2559cd6c392364d4247d",
    "sort": 12,
    "deleted": false
  }
}
```
### *删除分类*
#### 接口：`DELETE` /request/type
#### 参数
参数名 | 类型 | 是否必填 | 说明
--- | --- | --- | ---
_id | String | 是 | 分类Id
#### 使用示例

请求参数：

```json
{
  "_id": "591f2559cd6c392364d4247f"
}
```

返回结果：

```json
{
  "state": 1,
  "content": true
}
```