import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("ghcr.io/fluent-ci-templates/devbox:latest")
  .run("devbox version")
  .run("devbox global add leiningen clojure")
  .run('eval "$(devbox global shellenv)" && lein --version')
  .cmd('eval "$(devbox global shellenv)" && lein');

const dockerfile = image.toString();

console.log(dockerfile);
