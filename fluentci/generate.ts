import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("denoland/deno:alpine")
  .run("apk update")
  .run("apk add --no-cache curl docker-cli")
  .run(
    "curl -L https://dl.dagger.io/dagger/install.sh | DAGGER_VERSION=0.9.3 sh"
  )
  .run("mv bin/dagger /usr/local/bin")
  .run("dagger version")
  .run("deno install -A -r https://cli.fluentci.io -n fluentci")
  .copy("entry.sh", "/usr/local/bin/entrypoint.sh")
  .run("fluentci --version")
  .workdir("/workspace")
  .cmd(["fluentci"])
  .entrypoint(["/tini", "--", "entrypoint.sh"]);

const dockerfile = image.toString();

console.log(dockerfile);
