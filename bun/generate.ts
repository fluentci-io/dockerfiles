import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("ghcr.io/fluentci-io/devbox:latest")
  .run("devbox version")
  .run("devbox global add yarn nodejs@18.17.1 bun")
  .run('eval "$(devbox global shellenv --recompute)" && bun --version')
  .run('eval "$(devbox global shellenv --recompute)" && node --version')
  .cmd('eval "$(devbox global shellenv --recompute)" && bun');

const dockerfile = image.toString();

console.log(dockerfile);
