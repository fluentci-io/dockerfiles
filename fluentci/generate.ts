import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("denoland/deno:ubuntu-1.44.0")
  .run("apt-get update")
  .run("apt-get install -y curl wget git sudo")
  .run("curl https://pkgx.sh | sh")
  .arg("USER", "fluentci")
  .arg("USER_ID", "30033")
  .arg("GROUP_ID", "30033")
  .run(
    `addgroup --gid $GROUP_ID \${USER} \\
  && useradd --groups sudo --no-create-home --shell /bin/bash \${USER} --uid \${USER_ID} --gid \${GROUP_ID} \\
  && echo "\${USER} ALL=(ALL) NOPASSWD:ALL" >/etc/sudoers.d/\${USER} \\
  && chmod 0440 /etc/sudoers.d/\${USER}`
  )
  .run("mkdir -p /home/${USER} && chown -R ${USER}:${USER} /home/${USER}")
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
  .run("deno install -A -r -g https://cli.fluentci.io -n fluentci")
  .copy("entry.sh", "/usr/local/bin/entrypoint.sh")
  .run("fluentci upgrade")
  .run("fluentci --version")
  .user("${USER}")
  .workdir("/home/${USER}")
  .cmd(["fluentci"])
  .entrypoint(["/tini", "--", "entrypoint.sh"]);

const dockerfile = image.toString();

console.log(dockerfile);
