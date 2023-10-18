import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("rust:1.73.0-bullseye")
  .run("cargo install --git https://github.com/facebook/buck2.git buck2")
  .run("buck2 --version")
  .run("rustup install stable")
  .run("rustup default stable")
  .cmd("buck2");

const dockerfile = image.toString();

console.log(dockerfile);
