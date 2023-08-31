import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("ghcr.io/fluent-ci-templates/devbox:latest")
  .run("devbox global add zig@0.10.1")
  .run('eval "$(devbox global shellenv)" && zig version')
  .cmd('eval "$(devbox global shellenv)" && zig');

const dockerfile = image.toString();

console.log(dockerfile);
