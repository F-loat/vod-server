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
      "_id": "591feb05c9984406244a650e",
      "updatedAt": "2017-05-20T07:06:45.086Z",
      "createdAt": "2017-05-20T07:06:45.086Z",
      "name": "电影",
      "type": "video",
      "creater": {
        "_id": "591feb05c9984406244a650d",
        "stuid": "000000"
      },
      "__v": 0,
      "sort": 0,
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
  "name": "电视剧",
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
    "updatedAt": "2017-05-20T07:06:45.109Z",
    "createdAt": "2017-05-20T07:06:45.109Z",
    "name": "电视剧",
    "type": "video",
    "creater": "591feb05c9984406244a650f",
    "_id": "591feb05c9984406244a6511",
    "sort": 6,
    "deleted": false
  }
}
```
### *修改分类*
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
  "_id": "591feb05c9984406244a6513",
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
    "updatedAt": "2017-05-20T07:06:45.125Z",
    "createdAt": "2017-05-20T07:06:45.125Z",
    "name": "综艺",
    "creater": "591feb05c9984406244a6512",
    "_id": "591feb05c9984406244a6514",
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
  "_id": "591feb05c9984406244a6516"
}
```

返回结果：

```json
{
  "state": 1,
  "content": true
}
```