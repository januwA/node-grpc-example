## nodejs use grpc example

- [docs](https://grpc.io/docs/quickstart/node/)
- [什么是gRPC](https://grpc.io/docs/guides/)
- [创建服务](https://grpc.io/docs/guides/concepts/)
- [gRPC基础知识-Node.js](https://grpc.io/docs/tutorials/basic/node/)

> `*.proto`是模型文件，需要手动编写，和`graphql`的`schema`大同小异

## run server
```sh
$ npm run server
```

## run client
```sh
$ npm run client
```


## gRPC中的流
```js
const call = client.listFeatures(rectangle);
call.on('data', function(feature) {
});
call.on('end', function() {
  // The server has finished sending
});
call.on('error', function(e) {
  // An error has occurred and the stream has been closed.
});
call.on('status', function(status) {
  // process status
});

call.write("send_data"); // 发送数据
call.end(); // 结束流
```