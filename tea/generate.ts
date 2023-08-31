import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("homebrew/brew:latest")
  .run("brew install teaxyz/pkgs/tea-cli ")
  .run("tea --version")
  .cmd("tea");

const dockerfile = image.toString();

console.log(dockerfile);
