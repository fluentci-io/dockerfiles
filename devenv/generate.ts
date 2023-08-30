import { Dockerfile } from "https://deno.land/x/fluentdocker/mod.ts";

const image = new Dockerfile()
  .from("alpine:latest")
  .run("apk update")
  .run("apk add curl bash python3 alpine-sdk")
  .run(
    'curl --proto =https --tlsv1.2 -sSf -L https://install.determinate.systems/nix | sh -s -- install linux --extra-conf "sandbox = false" --init none --no-confirm'
  )
  .env("PATH", "${PATH}:/nix/var/nix/profiles/default/bin")
  .run(
    "sed -i 's/auto-allocate-uids = true/auto-allocate-uids = false/g' /etc/nix/nix.conf"
  )
  .run("adduser --disabled-password devenv")
  .run("addgroup devenv nixbld")
  .env("USER", "root")
  .run('echo "trusted-users = root $USER" | tee -a /etc/nix/nix.conf')
  .run("nix profile install --accept-flake-config github:cachix/cachix")
  .run("cachix use devenv")
  .run("nix profile install --accept-flake-config github:cachix/devenv/latest")
  .cmd("devenv version");

const dockerfile = image.toString();

console.log(dockerfile);
