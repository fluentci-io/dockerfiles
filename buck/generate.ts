import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("rust:latest")
  .run("rustup install nightly-2023-05-28")
  .run(
    "cargo +nightly-2023-05-28 install --git https://github.com/facebook/buck2.git buck2"
  )
  .run("buck2 --version")
  .run("rustup install stable")
  .run("rustup default stable")
  .cmd("buck2");

const dockerfile = image.toString();

console.log(dockerfile);
