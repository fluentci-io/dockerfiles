import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("ghcr.io/fluent-ci-templates/nix:latest")
  .run("adduser --disabled-password flox")
  .run("addgroup flox nixbld")
  .run(
    "echo 'extra-trusted-substituters = https://cache.floxdev.com' | tee -a /etc/nix/nix.conf && echo 'extra-trusted-public-keys = flox-store-public-0:8c/B+kjIaQ+BloCmNkRUKwaVPFWkriSAd0JJvuDu4F0=' | tee -a /etc/nix/nix.conf"
  )
  .run(
    'nix profile install --impure --experimental-features "nix-command flakes auto-allocate-uids" --accept-flake-config github:flox/floxpkgs#flox.fromCatalog'
  )
  .run("flox --version")
  .cmd("flox");

const dockerfile = image.toString();

console.log(dockerfile);
