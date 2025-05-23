import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z, ZodError } from "zod";

expand(config());

const EnvSchema = z
  .object({
    NODE_ENV: z.string().default("developement"),
    PORT: z.coerce.number(),
    LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
  })
  .superRefine((input, ctx) => {
    if (input.NODE_ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: "string",
        received: "undefined",
        path: ["DATABASE_AUTH_TOKEN"],
        message: "Must be set when NODE_ENV is production",
      });
    }
    return true;
  });

export type env = z.infer<typeof EnvSchema>;

let env: env;

try {
  // biome-ignore lint/nursery/noProcessEnv:s
  env = EnvSchema.parse(process.env);
} catch (e) {
  const error = e as ZodError;
  console.error("❌ invalid env");
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

export default env;
