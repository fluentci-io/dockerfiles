import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("pkgxdev/pkgx:latest")
  .run("pkgx install node npm bun pnpm classic.yarnpkg.com rtx")
  .run("node --version")
  .run("npm --version")
  .run("bun --version")
  .run("pnpm --version")
  .run("yarn --version")
  .run("rtx --version");

const dockerfile = image.toString();

console.log(dockerfile);
