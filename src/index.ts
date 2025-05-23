import { serve } from "bun";

import env from "@/env";
import app from "./app";

const port = env.PORT;
console.log(`Server is running on port: http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
