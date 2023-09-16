import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("ghcr.io/fluent-ci-templates/devbox:latest")
  .run("devbox global add buck2")
  .run('eval "$(devbox global shellenv)" && buck2 --version')
  .cmd('eval "$(devbox global shellenv)" && buck2');

const dockerfile = image.toString();

console.log(dockerfile);
