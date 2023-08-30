import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

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
  .run("adduser --disabled-password flox")
  .run("addgroup flox nixbld")
  .run(
    "echo 'extra-trusted-substituters = https://cache.floxdev.com' | tee -a /etc/nix/nix.conf && echo 'extra-trusted-public-keys = flox-store-public-0:8c/B+kjIaQ+BloCmNkRUKwaVPFWkriSAd0JJvuDu4F0=' | tee -a /etc/nix/nix.conf"
  )
  .run(
    'nix profile install --impure --experimental-features "nix-command flakes auto-allocate-uids" --accept-flake-config github:flox/floxpkgs#flox.fromCatalog'
  )
  .cmd("flox --version");

const dockerfile = image.toString();

console.log(dockerfile);
