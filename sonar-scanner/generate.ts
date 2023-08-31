import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("ghcr.io/fluent-ci-templates/devbox:latest")
  .run("devbox global add sonar-scanner-cli")
  .run('eval "$(devbox global shellenv)" && sonar-scanner --version')
  .cmd('eval "$(devbox global shellenv)" && sonar-scanner');

const dockerfile = image.toString();

console.log(dockerfile);
