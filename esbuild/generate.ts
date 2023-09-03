import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("node:lts-bookworm")
  .run("npm install -g esbuild")
  .run("esbuild --version")
  .cmd("esbuild");

const dockerfile = image.toString();

console.log(dockerfile);
