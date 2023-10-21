import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("ubuntu:23.04")
  .run("apt-get update")
  .run("apt-get install -y curl")
  .run("curl https://pkgx.sh | sh")
  .copy(".bashrc", "/root/.bashrc")
  .env("BASH_ENV", "/root/.bashrc")
  .shell(["bash", "-c"])
  .run("pkgx --version")
  .cmd("bash -i");

const dockerfile = image.toString();

console.log(dockerfile);
