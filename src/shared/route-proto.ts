import * as path from "path";
import * as grpc from "grpc";
import * as protoLoader from "@grpc/proto-loader";

export const PROTO_PATH = path.resolve(
  __dirname,
  "../../protos/route_guide.proto"
);

// 加载proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

export const RouteProto = grpc.loadPackageDefinition(packageDefinition)
  .routeguide;
