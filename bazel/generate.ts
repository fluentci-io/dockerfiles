import { Dockerfile } from "https://deno.land/x/fluentdocker/mod.ts";

const image = new Dockerfile()
  .from("openjdk:22-slim-bookworm")
  .run("apt-get update")
  .run("apt-get install -y wget build-essential")
  .run(
    "wget -O /usr/local/bin/bazelisk https://github.com/bazelbuild/bazelisk/releases/download/v1.18.0/bazelisk-linux-amd64"
  )
  .run("chmod +x /usr/local/bin/bazelisk")
  .run("bazelisk --version")
  .cmd("bazelisk");

const dockerfile = image.toString();

console.log(dockerfile);
