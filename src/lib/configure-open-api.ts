import { AppOpenApi } from "./types";

import packageJSON from "../../package.json";
import { Scalar } from "@scalar/hono-api-reference";

export default function configureOpenApi(app: AppOpenApi) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Task API",
    },
  });

  app.get(
    "/scalar",
    Scalar({
      url: "/doc",
      theme: "kepler",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
    }),
  );
}
