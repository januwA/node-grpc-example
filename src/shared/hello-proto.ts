import * as path from "path";
import * as grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";

export const PROTO_PATH = path.resolve(
  __dirname,
  "../../protos/helloworld.proto"
);
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

// 末尾的 [.helloworld] 是proto文件的包名
export const HelloProto = grpc.loadPackageDefinition(packageDefinition)
  .helloworld;
