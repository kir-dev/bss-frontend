import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const clientGraphqlEndpoint =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? process.env.GRAPHQL_ENDPOINT;

export const env = createEnv({
  server: {},
  client: {
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: z
      .string()
      .url("NEXT_PUBLIC_GRAPHQL_ENDPOINT has to be a valid URL"),
  },
  runtimeEnv: {
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: clientGraphqlEndpoint,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
