import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("ghcr.io/fluent-ci-templates/nix:latest")
  .run("adduser --disabled-password devbox")
  .run("addgroup devbox nixbld")
  .env("FORCE", "1")
  .run("curl -fsSL https://get.jetpack.io/devbox | bash")
  .run("devbox version")
  .cmd("devbox");

const dockerfile = image.toString();

console.log(dockerfile);
