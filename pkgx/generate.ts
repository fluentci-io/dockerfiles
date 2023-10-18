import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("homebrew/brew:latest")
  .run("brew install pkgxdev/made/pkgx")
  .run("pkgx --version")
  .cmd("pkgx");

const dockerfile = image.toString();

console.log(dockerfile);
