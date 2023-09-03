import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("node:lts-bookworm")
  .run("npm install -g elm-land@latest")
  .run("elm-land --version")
  .cmd("elm-land");

const dockerfile = image.toString();

console.log(dockerfile);
