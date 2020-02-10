import * as grpc from "grpc";

import { interval } from "rxjs";
import { take } from "rxjs/operators";

import { HelloProto } from "./shared/hello-proto";
import { RouteProto } from "./shared/route-proto";

// create server
const server = new grpc.Server();

server.addService((HelloProto as { Greeter: any }).Greeter.service, {
  sayHello(call, callback) {
    callback(null, { message: "Hello " + call.request.name });
  },
  hello(call, callback) {
    callback(null, { message: "Hi " + call.request.name });
  }
});

server.addService((RouteProto as { RouteGuide: any }).RouteGuide.service, {
  //* 普通示例
  getFeature(call, callback) {
    callback(null, { message: "普通示例" });
  },

  //* 服务器端流RPC
  listFeatures(call, callback) {
    interval(1000)
      .pipe(take(4))
      .subscribe(
        v => {
          call.write({ message: String(v) });
        },
        null,
        () => {
          // 结束流
          call.end();
        }
      );
  },

  //* 客户端流传输的RPC
  recordRoute(call, callback) {
    // 把每次发来的随便加一下，结束时返回去
    let r = 0;
    call.on("data", ({ latitude, longitude }) => (r += latitude + longitude));
    call.on("end", () => callback(null, { message: String(r) }));
  },

  //* 双向流RPC
  routeChat(call, callback) {
    call.on("data", ({ message }) => {
      // 每次客户端发来的值+1
      call.write({ message: "" + +message + 1 });
    });

    call.on("end", () => call.end());
  }
});
server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());

// start server
server.start();
console.log(`server start success!`);
