import * as grpc from "grpc";
import { interval } from "rxjs";
import { take } from "rxjs/operators";

import { HelloProto } from "./shared/hello-proto";
import { RouteProto } from "./shared/route-proto";

const helloClient = new (HelloProto as { Greeter: any }).Greeter(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// 发送给服务器
// helloClient.sayHello({ name: "Ajanuw" }, function(er, r) {
//   console.log(r.message);
// });
// helloClient.hello({ name: "Ajanuw" }, function(er, r) {
//   console.log(r.message);
// });

const routeClient = new (RouteProto as { RouteGuide: any }).RouteGuide(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// * 普通请求
// routeClient.getFeature({ latitude: 1, longitude: 2 }, (er, r) => {
//   console.log(r);
// });

// * 服务器返回流
// const call_1 = routeClient.listFeatures({});
// call_1.on("data", r => {
//   console.log(r);
// });
// call_1.on("end", () => {
//   console.log(`listFeatures done.`);
// });

// * 客服端发出流，服务器只返回一个结果
// const call_2 = routeClient.recordRoute((er, r) => {
//   if (er) {
//     console.error(er);
//     return;
//   }
//   console.log(r);
// });
// interval(1000)
//   .pipe(take(4))
//   .subscribe(
//     v => {
//       call_2.write({ latitude: 1, longitude: v });
//     },
//     null,
//     () => {
//       call_2.end();
//     }
//   );

const call_3 = routeClient.routeChat();
call_3.on("data", function(r) {
  console.log(r);
});
call_3.on("end", () => {
  console.log(`done.`);
});
interval(1000)
  .pipe(take(4))
  .subscribe(
    v => {
      call_3.write({ message: String(v) });
    },
    null,
    () => {
      call_3.end();
    }
  );
