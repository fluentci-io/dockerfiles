import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const DOCKER_VERSION = Deno.env.get("DOCKER_VERSION") || "27";
const DAGGER_VERSION = Deno.env.get("DAGGER_VERSION") || "0.12.4";
const DENO_VERSION = Deno.env.get("DENO_VERSION") || "1.45.5";

const image = new Dockerfile()
  .from(`denoland/deno:ubuntu-${DENO_VERSION}`)
  .run("apt-get update")
  .run("apt-get install -y curl wget git sudo build-essential")
  .run(
    "apt-get install -y --no-install-recommends ca-certificates iptables openssl pigz xz-utils"
  )
  .run("curl https://pkgx.sh | sh")
  .run("pkgx install docker.com/cli")
  .arg("USER", "fluentci")
  .arg("USER_ID", "30033")
  .arg("GROUP_ID", "30033")
  .run(
    `addgroup --gid $GROUP_ID \${USER} \\
  && useradd --groups sudo --no-create-home --shell /bin/bash \${USER} --uid \${USER_ID} --gid \${GROUP_ID} \\
  && echo "\${USER} ALL=(ALL) NOPASSWD:ALL" >/etc/sudoers.d/\${USER} \\
  && chmod 0440 /etc/sudoers.d/\${USER}`
  )
  .run("mkdir -p /home/${USER} && chown -R ${USER}:${USER} /home/${USER} /root")
  .run(
    "wget https://github.com/fluentci-io/fluentci-engine/releases/download/v0.4.7/fluentci-engine_v0.4.7_x86_64-unknown-linux-gnu.tar.gz"
  )
  .run("tar xvf fluentci-engine_v0.4.7_x86_64-unknown-linux-gnu.tar.gz")
  .run("mv fluentci-engine /usr/local/bin")
  .run("rm fluentci-engine_v0.4.7_x86_64-unknown-linux-gnu.tar.gz")
  .run(
    "wget https://dl.fluentci.io/fluentci-studio/v0.1.6/fluentci-studio_v0.1.6_x86_64-unknown-linux-gnu.tar.gz"
  )
  .run("tar xvf fluentci-studio_v0.1.6_x86_64-unknown-linux-gnu.tar.gz")
  .run("mv fluentci-studio /usr/local/bin")
  .run("rm fluentci-studio_v0.1.6_x86_64-unknown-linux-gnu.tar.gz")
  .run("which fluentci-studio")
  .run("fluentci-engine --version")
  .run(
    `curl -L https://dl.dagger.io/dagger/install.sh | DAGGER_VERSION=${DAGGER_VERSION} sh`
  )
  .run("mv bin/dagger /usr/local/bin")
  .run("dagger version")
  .run(
    "deno install -A -r -g --unstable-kv --import-map https://raw.githubusercontent.com/fluentci-io/fluentci/main/import_map.json  https://raw.githubusercontent.com/fluentci-io/fluentci/main/main.ts -n fluentci"
  )
  .copy("entry.sh", "/usr/local/bin/entrypoint.sh")
  .run("fluentci --version")
  .workdir("/root")
  .env("DOCKER_TLS_CERTDIR", "/certs")
  .run("mkdir /certs /certs/client && chmod 1777 /certs /certs/client")
  .copy(
    `--from=docker:${DOCKER_VERSION}-dind /usr/local/bin/`,
    "/usr/local/bin/"
  )
  .volume("/var/lib/docker")
  .cmd(["fluentci"])
  .entrypoint(["/tini", "--", "entrypoint.sh"]);

const dockerfile = image.toString();

console.log(dockerfile);
