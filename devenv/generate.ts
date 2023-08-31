import { Dockerfile } from "https://deno.land/x/fluentdocker@v0.1.1/mod.ts";

const image = new Dockerfile()
  .from("ghcr.io/fluent-ci-templates/nix:latest")
  .run("adduser --disabled-password devenv")
  .run("addgroup devenv nixbld")
  .env("USER", "root")
  .run('echo "trusted-users = root $USER" | tee -a /etc/nix/nix.conf')
  .run("nix profile install --accept-flake-config github:cachix/cachix")
  .run("cachix use devenv")
  .run("nix profile install --accept-flake-config github:cachix/devenv/latest")
  .run("devenv version")
  .cmd("devenv");

const dockerfile = image.toString();

console.log(dockerfile);
