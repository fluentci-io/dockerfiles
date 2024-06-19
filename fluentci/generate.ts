import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("denoland/deno:alpine-1.44.0")
  .run("apk update")
  .run("apk add --no-cache curl docker-cli wget bash")
  .run(
    "wget https://github.com/fluentci-io/fluentci-engine/releases/download/v0.4.1/fluentci-engine_v0.4.1_x86_64-unknown-linux-gnu.tar.gz"
  )
  .run("tar xvf fluentci-engine_v0.4.1_x86_64-unknown-linux-gnu.tar.gz")
  .run("mv fluentci-engine /usr/local/bin")
  .run("rm fluentci-engine_v0.4.1_x86_64-unknown-linux-gnu.tar.gz")
  .run(
    "wget https://dl.fluentci.io/fluentci-studio/v0.1.2/fluentci-studio_v0.1.2_x86_64-unknown-linux-gnu.tar.gz"
  )
  .run("tar xvf fluentci-studio_v0.1.2_x86_64-unknown-linux-gnu.tar.gz")
  .run("mv fluentci-studio /usr/local/bin")
  .run("rm fluentci-studio_v0.1.2_x86_64-unknown-linux-gnu.tar.gz")
  .run("which fluentci-studio")
  .run("fluentci-engine --version")
  .run(
    "curl -L https://dl.dagger.io/dagger/install.sh | DAGGER_VERSION=0.11.7 sh"
  )
  .run("mv bin/dagger /usr/local/bin")
  .run("dagger version")
  .run("deno install -A -r -g https://deno.land/x/fluentci -n fluentci")
  .copy("entry.sh", "/usr/local/bin/entrypoint.sh")
  .run("fluentci --version")
  .workdir("/workspace")
  .cmd(["fluentci"])
  .entrypoint(["/tini", "--", "entrypoint.sh"]);

const dockerfile = image.toString();

console.log(dockerfile);
