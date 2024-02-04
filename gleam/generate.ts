import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("pkgxdev/pkgx:latest")
  .run("apt-get update")
  .run("apt-get install -y ca-certificates")
  .run("pkgx install gleam escript")
  .run("gleam --version");

const dockerfile = image.toString();

console.log(dockerfile);
