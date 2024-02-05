import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("ghcr.io/fluentci-io/devbox:latest")
  .run("devbox global add sonar-scanner-cli nodejs")
  .run(
    'eval "$(devbox global shellenv --recompute)" && sonar-scanner --version'
  )
  .cmd('eval "$(devbox global shellenv --recompute)" && sonar-scanner');

const dockerfile = image.toString();

console.log(dockerfile);
